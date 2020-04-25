static bool copy_file_info(void) {

  /******Параметры модификации*****/
  struct file *fd_read; // Указатель на файловую структуру для чтения
  struct file *fd_record; // Указатель на файловую структуру для записи
  ssize_t ret;
  char portion_info[350]; // Буффер временного хранения полученной части информации о
    // процессое 
  int flags_read = O_RDONLY; // Флаги на разрешение чтение файла
  int flags_write = O_WRONLY | O_CREAT; // Флаги на разрешение записи и создания файла
  mm_segment_t fs; // Дескриптор файлового потока

  // Открытие файла со стихотворением
  fd_read = filp_open("/home/osboxes/Documents/source.txt", flags_read, 0777);

  if (IS_ERR(fd_read))
  {
    printk("Cannot open file\n"); 
    return false; 
  }

  // Создание файла на рабочем столе, куда информация будет скопирована
  fd_record = filp_open("/home/osboxes/Desktop/destination.txt", flags_write, 0777);
   
  if (IS_ERR(fd_record))
  {
    printk("Cannot create file\n");
    return false; // Вернуть false
  }

  fs = get_fs(); // Получить дескриптор текущий файловый поток
  set_fs(KERNEL_DS); // Установить структуру ядра в качестве файлового потока

  // Пока указатель на позицию чтения файла не дошёл до конца содержимого файла
  while ((ret = kernel_read(fd_read, portion_info, 100, &fd_read->f_pos)) > 0)
  {
    // Вывести сохранённую в буффер информацию о процессоре в системный лог ядра
    printk("%s\n", portion_info);
    // Записать сохранённую в буффер информацию о процессоре в файл   
    kernel_write(fd_record, portion_info, 100, &fd_record->f_pos);
  }

  set_fs(fs); // Установить начальный файловый поток

  filp_close(fd_read, NULL); // Закрытие файла на чтение
  filp_close(fd_record, NULL); // Закрытие файла на запись

  return true; // Вернуть true
}