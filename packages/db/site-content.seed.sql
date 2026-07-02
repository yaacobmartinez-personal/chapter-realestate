-- ─────────────────────────────────────────────────────────────────────────────
-- Chapter Real Estate — Site Content seed
-- Populates Leadership, Testimonials, Company Values, Chapter's Process, and
-- Social Links with the starting values. Run AFTER site-content.sql.
--
-- Uses upserts (on conflict) so it's safe to re-run. Edit these values here, or
-- manage them in the admin (Site Content) once seeded.
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── Leadership ───────────────────────────────────────────────────────────────
insert into public.team_members (id, name, role, bio, image, sort_order) values
  ('l1', 'Armin Barsomian', 'Founder & Managing Partner', 'Co-founder of Chapter Real Estate, Armin leads the company''s vision, growth, and day-to-day operations across Manitoba.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', 1),
  ('l2', 'Dylan', 'Founder & Partner', 'Co-founder of Chapter Real Estate, Dylan helps shape the company''s direction and long-term strategy.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', 2),
  ('l3', 'Avanish', 'Broker & Partner', 'Broker and partner at Chapter Real Estate, upholding the highest compliance and service standards for clients.', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', 3)
on conflict (id) do update set
  name = excluded.name, role = excluded.role, bio = excluded.bio, image = excluded.image, sort_order = excluded.sort_order;

-- ─── Testimonials ─────────────────────────────────────────────────────────────
insert into public.testimonials (id, quote, author, context, sort_order) values
  ('t1', 'Chapter made selling our home effortless. Their marketing strategy was unlike anything we''d seen — we had multiple offers within days.', 'David & Karen T.', 'Sellers, River Heights', 1),
  ('t2', 'As a landlord with multiple properties, I can''t imagine managing them without Chapter. The owner portal alone saves me hours every month.', 'Michael R.', 'Property Owner, 4 Units', 2),
  ('t3', 'The investment team at Chapter helped me identify a multifamily opportunity I never would have found on my own. Exceptional guidance.', 'Linda H.', 'Investor', 3)
on conflict (id) do update set
  quote = excluded.quote, author = excluded.author, context = excluded.context, sort_order = excluded.sort_order;

-- ─── Company Values ───────────────────────────────────────────────────────────
insert into public.company_values (id, icon_key, title, description, sort_order) values
  ('v1', 'Heart', 'Put People First', 'We prioritize relationships over transactions — listening closely, anticipating needs, and treating every client with respect.', 1),
  ('v2', 'Lightbulb', 'Innovative Service', 'We challenge the conventional way of doing things and find better, more creative ways to exceed expectations.', 2),
  ('v3', 'Users', 'Build Community', 'We foster a supportive environment where our team and our clients feel like an extended family.', 3),
  ('v4', 'Award', 'Lead by Example', 'We model transparency, humility, and integrity — inspiring change across our team and the wider industry.', 4),
  ('v5', 'TrendingUp', 'Growth & Learning', 'We stay curious and never stop learning, always sharpening our craft for the people we serve.', 5),
  ('v6', 'Zap', 'Embrace Change', 'We lead transformation in Manitoba real estate rather than react to it — always improving how we work.', 6)
on conflict (id) do update set
  icon_key = excluded.icon_key, title = excluded.title, description = excluded.description, sort_order = excluded.sort_order;

-- ─── Chapter's Process ────────────────────────────────────────────────────────
insert into public.process_steps (id, step, title, description, sort_order) values
  ('p01', '01', 'Initial Consultation', 'We start by understanding your rental goals and walk you through how Chapter manages your property.', 1),
  ('p02', '02', 'Property Evaluation', 'We assess your property''s rental value based on location, size, condition, and amenities.', 2),
  ('p03', '03', 'Marketing Strategy', 'We create a custom marketing plan with professional photography and targeted advertising to attract quality tenants.', 3),
  ('p04', '04', 'Tenant Screening', 'We run thorough background checks, employment verification, and rental history reviews.', 4),
  ('p05', '05', 'Lease Agreement', 'We prepare a compliant lease outlining terms, rent, duration, and responsibilities.', 5),
  ('p06', '06', 'Move-In Inspection', 'We document the property''s condition in detail to protect your interests.', 6),
  ('p07', '07', 'Periodic Inspections', 'We monitor your property over time to catch maintenance issues early.', 7),
  ('p08', '08', 'Rent Collection & Maintenance', 'We handle rent payments and coordinate repairs so you don''t have to.', 8),
  ('p09', '09', 'Regular Communication', 'We keep you informed throughout the tenancy with clear, consistent updates.', 9),
  ('p10', '10', 'End-of-Tenancy Inspection', 'We complete a final assessment and handle the deposit per Manitoba''s Residential Tenancies rules.', 10)
on conflict (id) do update set
  step = excluded.step, title = excluded.title, description = excluded.description, sort_order = excluded.sort_order;

-- ─── Social Links (update href with your real profile URLs) ───────────────────
insert into public.social_links (id, name, href, enabled, sort_order) values
  ('s1', 'Instagram', '#', true, 1),
  ('s2', 'Facebook', '#', true, 2),
  ('s3', 'LinkedIn', '#', true, 3),
  ('s4', 'X', '#', true, 4)
on conflict (id) do update set
  name = excluded.name, href = excluded.href, enabled = excluded.enabled, sort_order = excluded.sort_order;
