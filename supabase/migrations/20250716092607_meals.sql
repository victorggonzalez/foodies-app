create table public.meals (
  id bigint generated always as identity not null,
  slug text not null,
  title text not null,
  image text not null,
  summary text not null,
  instructions text not null,
  creator text not null,
  creator_email text not null,
  constraint meals_pkey primary key (id),
  constraint meals_slug_key unique (slug)
) TABLESPACE pg_default;
