
DROP POLICY "Anyone can insert analytics" ON public.analytics_events;
CREATE POLICY "Public can insert bounded analytics" ON public.analytics_events
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(event_type) BETWEEN 1 AND 64
    AND (path IS NULL OR length(path) <= 256)
    AND (session_id IS NULL OR length(session_id) <= 64)
    AND (user_agent IS NULL OR length(user_agent) <= 512)
    AND (referrer IS NULL OR length(referrer) <= 512)
  );
