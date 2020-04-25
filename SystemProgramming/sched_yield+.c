#include <linux/ktime.h>

static void do_sched_yield(void)
{
  struct rq_flags rf;
  struct rq *rq;
  struct timespec tv;

  // Получили текущее время
  getnstimeofday(&tv);

  printk(KERN_INFO "Current time in seconds %ld, current UID = %u\n", tv.tv_sec,
        get_current_user()->uid); // Получили UID текущего юзера

  rq = this_rq_lock_irq(&rf);

  schedstat_inc(rq->yld_count);
  current->sched_class->yield_task(rq);

  /*
   * Since we are going to call schedule() anyway, there's
   * no need to preempt or enable interrupts:
   */
  preempt_disable();
  rq_unlock(rq, &rf);
  sched_preempt_enable_no_resched();

  schedule();
}