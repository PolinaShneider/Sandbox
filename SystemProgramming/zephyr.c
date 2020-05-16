k_tid_t z_vrfy_k_thread_create(struct k_thread *new_thread,
	k_thread_stack_t *stack,
	size_t stack_size, k_thread_entry_t entry,
	void *p1, void *p2, void *p3,
	int prio, u32_t options, k_timeout_t delay)
{
	size_t total_size, stack_obj_size;
	struct z_object *stack_object;

	/* The thread and stack objects *must* be in an uninitialized state */
	Z_OOPS(Z_SYSCALL_OBJ_NEVER_INIT(new_thread, K_OBJ_THREAD));
	stack_object = z_object_find(stack);
	Z_OOPS(Z_SYSCALL_VERIFY_MSG(z_obj_validation_check(stack_object, stack,
		K_OBJ_THREAD_STACK_ELEMENT,
		_OBJ_INIT_FALSE) == 0,
		"bad stack object"));

	/* Verify that the stack size passed in is OK by computing the total
	 * size and comparing it with the size value in the object metadata
	 */
	Z_OOPS(Z_SYSCALL_VERIFY_MSG(!size_add_overflow(K_THREAD_STACK_RESERVED,
		stack_size, &total_size),
		"stack size overflow (%zu+%zu)",
		stack_size,
		K_THREAD_STACK_RESERVED));

	/* Testing less-than-or-equal since additional room may have been
	 * allocated for alignment constraints
	 */
#ifdef CONFIG_GEN_PRIV_STACKS
	stack_obj_size = stack_object->data.stack_data->size;
#else
	stack_obj_size = stack_object->data.stack_size;
#endif
	Z_OOPS(Z_SYSCALL_VERIFY_MSG(total_size <= stack_obj_size,
		"stack size %zu is too big, max is %zu",
		total_size, stack_obj_size));

	/* User threads may only create other user threads and they can't
	 * be marked as essential
	 */
	Z_OOPS(Z_SYSCALL_VERIFY(options & K_USER));
	Z_OOPS(Z_SYSCALL_VERIFY(!(options & K_ESSENTIAL)));

	/* Check validity of prio argument; must be the same or worse priority
	 * than the caller
	 */
	Z_OOPS(Z_SYSCALL_VERIFY(_is_valid_prio(prio, NULL)));
	Z_OOPS(Z_SYSCALL_VERIFY(z_is_prio_lower_or_equal(prio,
		_current->base.prio)));

	z_setup_new_thread(new_thread, stack, stack_size,
		entry, p1, p2, p3, prio, options, NULL);

	if (!K_TIMEOUT_EQ(delay, K_FOREVER)) {
		schedule_new_thread(new_thread, delay);
	}

	return new_thread;
}
