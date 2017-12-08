select count(*)
from (
select uid
  from user_event u1
  where date(time) = '2017-04-01'
  and event_name = 'FIRST_INSTALL'
  and exists(
    select *
    from user_event u2
    where time >= '2017-04-02'
    and time <= '2017-04-07'
    and u1.uid = u2.uid limit 1
  )
) as matching_event;
