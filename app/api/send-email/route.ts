import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(request: Request) {
  try {
    const { email, full_name } = await request.json();

    if (!email || !full_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Attempt to send an email. If RESEND_API_KEY is not configured or dummy, 
    // it will throw an error or fail silently depending on Resend sdk.
    // For local development, this won't crash the server.
    const { data, error } = await resend.emails.send({
      from: 'Marketing Agency <onboarding@resend.dev>', // Update this to your verified domain once ready
      to: [email],
      subject: 'Application Received!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2>Hi ${full_name},</h2>
          <p>We have successfully received your application. We appreciate your interest in scaling your business with our proven marketing systems.</p>
          <p>Our team will review your details shortly. In the meantime, please make sure you have booked your free demo call using the calendar link on the confirmation page.</p>
          <br/>
          <p>Best regards,</p>
          <p><strong>The Marketing Funnel Team</strong></p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
