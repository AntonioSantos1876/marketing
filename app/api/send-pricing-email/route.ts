import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(request: Request) {
  try {
    const { email, full_name } = await request.json();

    if (!email || !full_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Strategic Team <onboarding@resend.dev>', // Update this to your verified domain in production
      to: [email],
      subject: 'Your Growth Blueprint & Next Steps',
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; color: #111; background-color: #f9f9f9; padding: 40px; border-top: 4px solid #f97316;">
          <h2 style="text-transform: uppercase; font-weight: 900; font-size: 24px; margin-bottom: 24px;">Strategic Pipeline Approved.</h2>
          
          <p style="font-size: 16px; line-height: 1.6;">Hi ${full_name},</p>
          
          <p style="font-size: 16px; line-height: 1.6;">Thank you for your time on our demo call mapping out your infrastructure. We've reviewed your current metrics and are incredibly confident we can systematically scale your operations using our omnichannel models.</p>
          
          <p style="font-size: 16px; line-height: 1.6;">To officially begin the onboarding process and formally lock in your spot on our roster, please review your customized growth package and complete secure checkout via the link below:</p>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="https://yourdomain.com/pricing" style="background-color: #f97316; color: #000; padding: 18px 32px; text-decoration: none; font-weight: 900; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Access Pricing & Secure Status</a>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6;">If you have any last-minute questions before deploying capital, reply directly to this email.</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 40px 0;" />
          
          <p style="font-size: 14px; color: #666; font-weight: bold; margin-bottom: 0;">The Strategic Team</p>
          <p style="font-size: 12px; color: #888; margin-top: 5px;">Automated Client Dispatch</p>
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
    return NextResponse.json({ error: 'Failed to send email framework' }, { status: 500 });
  }
}
