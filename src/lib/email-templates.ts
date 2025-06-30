interface BetaWelcomeEmailData {
  email: string;
  domain: string;
}

export function generateBetaWelcomeEmail({
  email,
  domain,
}: BetaWelcomeEmailData) {
  const domainName = domain.replace(/^https?:\/\//, "").replace(/^www\./, "");

  return {
    from: `Fest Vibes Team <noreply@${domainName}>`,
    to: [email],
    subject: "Welcome to the Fest Vibes Beta",
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #6b46c1, #ec4899); color: white; border-radius: 16px; overflow: hidden;">
        <div style="padding: 40px 30px; text-align: center;">

          <!-- Boomy Logo -->
          <div style="margin-bottom: 30px;">
            <img src="${domain}/boomy-nav.png" alt="Boomy the Boombox" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.2);" />
          </div>

          <h1 style="font-size: 2.5rem; margin-bottom: 20px; background: linear-gradient(to right, #a855f7, #ffffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1.2;">
            Welcome to Fest Vibes
          </h1>

          <p style="font-size: 1.2rem; margin-bottom: 30px; color: #fdf4ff; line-height: 1.5;">
            Thanks for joining our beta list. You're now part of an exclusive group who will get first access to Fest Vibes.
          </p>

          <div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 25px; margin: 30px 0; text-align: left;">
            <h2 style="color: #a855f7; margin-bottom: 15px; text-align: center;">What is Fest Vibes?</h2>
            <p style="color: #fdf4ff; line-height: 1.6; text-align: center;">
              Your AI-powered festival planning companion that transforms any day into a personalized music festival experience. Discover live local music, plan with friends, and create unforgettable musical memories.
            </p>
          </div>

          <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 25px; margin: 30px 0;">
            <h3 style="color: #ec4899; margin-bottom: 15px; font-size: 1.1rem;">What happens next?</h3>
            <ul style="color: #fdf4ff; text-align: left; line-height: 1.8; padding-left: 20px;">
              <li>We're launching soon to revolutionize how you discover and experience live music</li>
              <li>You'll receive exclusive updates about our progress</li>
              <li>Get early access before the public launch</li>
              <li>Chat with Boomy the Boombox for personalized festival planning</li>
              <li>Discover local venues, artists, and create amazing music weekends</li>
            </ul>
          </div>

          <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; font-size: 0.9rem; color: #ec4899; margin-top: 30px;">
            Keep an eye on your inbox for exclusive updates and early access notifications.
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); color: #d1d5db; font-size: 0.8rem;">
            Fest Vibes - Your Festival Planning Companion<br>
            Democratizing music festival experiences for everyone
          </div>
        </div>
      </div>
    `,
  };
}
