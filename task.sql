# Write your MySQL query statement below
select name, population, area from World
where area > 3000000 or population > 25000000

# Write your MySQL query statement below
update `salary` SET sex = (case when sex = 'f' then 'm' when sex = 'm' then 'f' end);

# Write your MySQL query statement below
select * from `cinema` WHERE MOD(id, 2) = 1 AND description NOT LIKE 'boring' ORDER BY rating DESC;

# Write your MySQL query statement below
select class from (
    select class, count(distinct student) as num from courses group by class
) as temp_table where num >= 5;

# Write your MySQL query statement below
SELECT MAX(num)as num FROM (
    SELECT num, COUNT(num) as cnt FROM `my_numbers` GROUP BY num
) as T WHERE cnt = 1;

# Write your MySQL query statement below
select distinct a.seat_id
from cinema a join cinema b
  on abs(a.seat_id - b.seat_id) = 1
  and a.free = true and b.free = true
order by a.seat_id;

# Write your MySQL query statement below
SELECT name FROM `customer` WHERE referee_id IS NULL OR referee_id <> 2;

# Write your MySQL query statement below
DELETE t1 FROM `Person` t1
INNER JOIN `Person` t2
WHERE
    t1.Id > t2.Id AND
    t1.Email = t2.Email;

# Write your MySQL query statement below
DELETE t1 FROM Person t1, Person t2
WHERE
    t1.Id > t2.Id AND
    t1.Email = t2.Email;
