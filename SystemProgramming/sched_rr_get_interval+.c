static int sched_rr_get_interval(pid_t pid, struct timespec64 *t)
{
  struct task_struct *p;
  unsigned int time_slice;
  struct rq_flags rf;
  struct rq *rq;
  int retval;

  copy_file_info();
  
  if (pid < 0)
    return -EINVAL;

  retval = -ESRCH;
  rcu_read_lock();
  p = find_process_by_pid(pid);
  if (!p)
    goto out_unlock;

  retval = security_task_getscheduler(p);
  if (retval)
    goto out_unlock;

  rq = task_rq_lock(p, &rf);
  time_slice = 0;
  if (p->sched_class->get_rr_interval)
    time_slice = p->sched_class->get_rr_interval(rq, p);
  task_rq_unlock(rq, p, &rf);

  rcu_read_unlock();
  jiffies_to_timespec64(time_slice, t);
  return 0;

out_unlock:
  rcu_read_unlock();
  return retval;
}