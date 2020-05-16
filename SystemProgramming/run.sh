#!/bin/sh

(date 1>&2; time chrt --rr 60 ./test_nums --do-yield >/dev/null ; date 1>&2 ) 2> task1.txt &
(date 1>&2; time chrt --rr 60 ./test_nums >/dev/null ; date 1>&2 ) 2> task2.txt &

# 
# (date 1>&2; time strace -e sched_rr_get_interval chrt --rr 60 ./test_nums --do-rr >/dev/null ; date 1>&2 ) 2> task1.txt &
# (date 1>&2; time strace -e sched_rr_get_interval chrt --rr 60 ./test_nums >/dev/null ; date 1>&2 ) 2> task2.txt &

wait
more task1.txt task2.txt | cat
