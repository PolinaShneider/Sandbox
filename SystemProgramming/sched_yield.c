/**
 * sys_sched_yield - yield the current processor to other threads.
 *
 * This function yields the current CPU to other tasks. If there are no
 * other threads running on this CPU then this function will return.
 *
 * Return: 0.
 */
static void do_sched_yield(void)
{
	struct rq_flags rf; // флаги прерывания
	struct rq *rq; // runqueue lock

	// производим блокировку и выключаем прерывания
	rq = this_rq_lock_irq(&rf); 

	schedstat_inc(rq->yld_count);
	current->sched_class->yield_task(rq);

	/*
	 * Since we are going to call schedule() anyway, there's
	 * no need to preempt or enable interrupts:
	 */
	preempt_disable(); // запрет вытеснения системного процесса (увеличиваем на единицу значение счетчика)
	rq_unlock(rq, &rf); // разблокируем очередь
	sched_preempt_enable_no_resched(); // уменьшаем на единицу значение счетчика

	schedule(); // находит процесс в очереди и назначает ему процессор
}

SYSCALL_DEFINE0(sched_yield)
{
	do_sched_yield();
	return 0;
}
