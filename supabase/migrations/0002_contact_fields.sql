-- Add the optional contact fields the V2 form submits.
-- Safe to re-run.

alter table contact_submissions add column if not exists phone text;
alter table contact_submissions add column if not exists category text;
