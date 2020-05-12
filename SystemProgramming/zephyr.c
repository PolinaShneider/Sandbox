include <kernel.h>
#include <drivers/timer/system_timer.h>
#include <sys/printk.h>
#include <power/reboot.h>

extern void sys_arch_reboot(int type);
extern void sys_clock_disable(void);

void sys_reboot(int type)
{
	(void)irq_lock();
#ifdef CONFIG_SYS_CLOCK_EXISTS
	sys_clock_disable();
#endif

	sys_arch_reboot(type);

	/* should never get here */
	printk("Failed to reboot: spinning endlessly...\n");
	for (;;) {
		k_cpu_idle();
	}
}

Листинг А.13: Исходный код функции выключения операционной системы реального времени Zephyr OS
#if CONFIG_DEVICE_POWER_MANAGEMENT
static int sys_pm_init(struct device *dev)
{
	ARG_UNUSED(dev);

	sys_pm_create_device_list();
	return 0;
}

SYS_INIT(sys_pm_init, APPLICATION, CONFIG_KERNEL_INIT_PRIORITY_DEFAULT);
#endif /* CONFIG_DEVICE_POWER_MANAGEMENT */

static struct pm_debug_info pm_dbg_info[SYS_POWER_STATE_MAX];
static u32_t timer_start, timer_end;

static inline void sys_pm_debug_start_timer(void)
{
	timer_start = k_cycle_get_32();
}

static inline void sys_pm_debug_stop_timer(void)
{
	timer_end = k_cycle_get_32();
}

static void sys_pm_log_debug_info(enum power_states state)
{
	u32_t res = timer_end - timer_start;

	pm_dbg_info[state].count++;
	pm_dbg_info[state].last_res = res;
	pm_dbg_info[state].total_res += res;
}

void sys_pm_dump_debug_info(void)
{
	for (int i = 0; i < SYS_POWER_STATE_MAX; i++) {
		LOG_DBG("PM:state = %d, count = %d last_res = %d, "
			"total_res = %d\n", i, pm_dbg_info[i].count,
			pm_dbg_info[i].last_res, pm_dbg_info[i].total_res);
	}
}
#else
static inline void sys_pm_debug_start_timer(void) { }
static inline void sys_pm_debug_stop_timer(void) { }
static void sys_pm_log_debug_info(enum power_states state) { }
void sys_pm_dump_debug_info(void) { }
#endif
