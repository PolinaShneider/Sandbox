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
