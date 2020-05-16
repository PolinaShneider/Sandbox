#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sched.h>

#define MAX_RESULTS 15

// По флагам определяем, какой системный вызов тестировать
int find_nums(int do_yield, int skip_syscall, long int *results)
{
  long int a, b, c;
  int count = 0;
  struct timespec t;
  struct timespec tp;

  int status = sched_rr_get_interval(0, &tp); // Получим интервал планировщика 

  if (status == 0)
  {
    printf("Timeslice is %ld seconds %ld nano secs\n", tp.tv_sec, tp.tv_nsec);
  }
  else
  {
    printf("fail status is %d", status);
  }

  for (a = 100; a <= 999; a++)
  {
    for (b = 0; b <= 999; b++)
    {
      for (c = 0; c <= 999; c++)
      {
        if (a * a * a + b * b * b + c * c * c == a * 1000 * 1000 + b * 1000 + c)
        {
          if (count < MAX_RESULTS)
          {
            results[count] = a * 1000 * 1000 + b * 1000 + c;
          }

          count++;
        }
        if (!skip_syscall & c % 20 == 0)
        {
          if (do_yield)
            sched_yield(); // Если передан флаг do_yield
          else
            sched_rr_get_interval(0, &t);
        }
      }
    }
  }

  return count;
}

int main(int argc, char **argv)
{
  int do_yield;
  int skip_syscall;

  long int results[MAX_RESULTS];
  int count_results;

  // Если программа вызвана без аргументов, либо с аргументом --skip-syscall, не выполнять системные вызовы
  skip_syscall = (argc < 2) || (strcmp(argv[1], "--skip-syscall") == 0); 
  // Если передан аргумент --do-yield, выполнить системный вызов sched_yield
  do_yield = (argc > 1) && strcmp(argv[1], "--do-yield") == 0; 
  // Если передан любой другой аргумент, будет выполнен системный вызов sched_rr_get_interval

  // Задержка для теста запуска двух инстансов программы
  sleep(1); // allow run second proc

  count_results = find_nums(do_yield, skip_syscall, results);
  return 0;

  for (int i = 0; i < count_results; i++)
  {
    printf("%ld\n", results[i]);
  }

  return 0;
}