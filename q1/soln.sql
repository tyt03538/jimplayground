select count(*)
from (
select uid
  from piwik_track_test u1
  where date(time) = '2017-04-01'
  and event_name = 'FIRST_INSTALL'
  and exists(
    select *
    from piwik_track_test u2
    where time >= '2017-04-02'
    and time <= '2017-04-08'
    and u1.uid = u2.uid limit 1
  )
) as matching_event;
