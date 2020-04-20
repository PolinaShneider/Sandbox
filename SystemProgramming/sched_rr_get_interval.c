// параметры: pid — id процесса, *t — указатель на структуру данных типа 
// struct timespec {
//  time_t  tv_sec;     /* секунды */
//  long    tv_nsec;    /* наносекунды */
//};
static int sched_rr_get_interval(pid_t pid, struct timespec64 *t)
{
	struct task_struct *p; // здесь содержится вся информация о процессе
	unsigned int time_slice;
	struct rq_flags rf; // флаги прерывания
	struct rq *rq; // runqueue lock
	int retval; // возвращаемое значение: 0 при удачном завершении, либо код ошибки

	if (pid < 0)
		return -EINVAL; // если id процесса < 0, ошибка «не валидный аргумент»

	retval = -ESRCH; // «нет такого процесса»
	rcu_read_lock(); // объявление о входе потока-читателя в критическую секцию
	p = find_process_by_pid(pid); // ищем процесс по id

	if (!p)
		goto out_unlock; // не нашли процесс по id, выход

	retval = security_task_getscheduler(p); // проверяем права доступа
	if (retval)
		goto out_unlock; // если прав нет, выход

	rq = task_rq_lock(p, &rf); // блокируем очередь выполнения
	time_slice = 0;
	if (p->sched_class->get_rr_interval) // получаем и записываем информацию об интервале
		time_slice = p->sched_class->get_rr_interval(rq, p);
	task_rq_unlock(rq, p, &rf); // разблокируем очередь

	rcu_read_unlock(); // выход потока-читателя из критической секции
	jiffies_to_timespec64(time_slice, t); // приводим интервал в формат tv_sec, tv_nsec

	return 0; // все ок, вернули 0

out_unlock:
	rcu_read_unlock(); // аварийный выход потока-читателя из критической секции

	return retval;
}

/**
 * sys_sched_rr_get_interval - return the default timeslice of a process.
 * @pid: pid of the process.
 * @interval: userspace pointer to the timeslice value.
 *
 * this syscall writes the default timeslice value of a given process
 * into the user-space timespec buffer. A value of '0' means infinity.
 *
 * Return: On success, 0 and the timeslice is in @interval. Otherwise,
 * an error code.
 */
SYSCALL_DEFINE2(sched_rr_get_interval, pid_t, pid,
		struct __kernel_timespec __user *, interval)
{
	struct timespec64 t;
	int retval = sched_rr_get_interval(pid, &t); // возвращаемое значение: 0 — успех, либо код ошибки

	if (retval == 0)
		retval = put_timespec64(&t, interval); // получаем интервал в формате tv_sec, tv_nsec

	return retval;
}
