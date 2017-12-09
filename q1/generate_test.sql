create database if not exists playground;
use playground;

drop table if exists piwik_track_test;

create table piwik_track_test (
  time datetime,
  uid varchar(256),
  event_name varchar(256)
);

insert into piwik_track_test 
values ('2017-04-01 09:12:00', 'testcase0101', 'FIRST_INSTALL'),
       ('2017-04-02 09:13:00', 'testcase0101', 'DUMMY_EVENT'),
       ('2017-04-01 09:14:00', 'testcase0102', 'FIRST_INSTALL'),
       ('2017-04-07 09:15:00', 'testcase0102', 'DUMMY_EVENT'),
       ('2017-04-08 09:16:00', 'testcase0102', 'DUMMY_EVENT'),
       ('2017-04-01 09:17:00', 'testcase0201', 'FIRST_INSTALL'),
       ('2017-04-11 09:25:00', 'testcase0202', 'DUMMY_EVENT'),
       ('2017-04-03 09:18:00', 'testcase0301', 'FIRST_INSTALL'),
       ('2017-04-03 09:19:00', 'testcase0301', 'DUMMY_EVENT'),
       ('2017-04-04 09:20:00', 'testcase0302', 'FIRST_INSTALL'),
       ('2017-04-05 09:21:00', 'testcase0302', 'DUMMY_EVENT'),
       ('2017-04-06 09:22:00', 'testcase0302', 'DUMMY_EVENT'),
       ('2017-04-04 09:23:00', 'testcase0401', 'FIRST_INSTALL'),
       ('2017-04-07 09:24:00', 'testcase0501', 'DUMMY_EVENT'),
       ('2017-04-08 09:25:00', 'testcase0502', 'DUMMY_EVENT'),
       ('2017-04-08 09:26:00', 'testcase0502', 'DUMMY_EVENT'),
       ('2017-04-09 09:27:00', 'testcase0601', 'DUMMY_EVENT'),
       ('2017-04-10 09:28:00', 'testcase0601', 'DUMMY_EVENT');

