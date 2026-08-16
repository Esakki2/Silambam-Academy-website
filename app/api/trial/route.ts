import { NextResponse } from "next/server";
import { trialRegistrationSchema } from "@/lib/validations/trial";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = trialRegistrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // If no Supabase, accept but don't persist (demo mode)
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      console.log("[Demo] Trial registration:", data);
      return NextResponse.json({ ok: true, demo: true });
    }

    const supabase = await createClient();
    const { error } = await supabase.from("trial_registrations").insert({
      student_name: data.student_name,
      date_of_birth: data.date_of_birth || null,
      age: data.age && !Number.isNaN(data.age) ? data.age : null,
      parent_guardian_name: data.parent_guardian_name || null,
      phone: data.phone,
      email: data.email || null,
      preferred_class: data.preferred_class || null,
      preferred_day_time: data.preferred_day_time || null,
      previous_experience: data.previous_experience || null,
      message: data.message || null,
      consent: true,
      status: "NEW",
    });

    if (error) {
      console.error("Trial insert error:", error);
      return NextResponse.json(
        { error: "Could not save registration" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
