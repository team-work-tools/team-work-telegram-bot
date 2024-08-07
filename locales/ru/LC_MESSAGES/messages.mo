��    b      ,              <  �   =  @  �  �   5  �   �  �   m	  /   �	  ,   )
  �   V
  t   �
  ;   f     �  %   �     �  *   �          $     ,     =     M     h  ,   t  $   �  	   �     �     �  %   �       (   !     J     Y     t     �     �     �     �     �  +   �  Z        _  .   h  /   �  0   �  i   �  1   b  '   �     �     �     �     �  �   �  2   �  &   �  N     b   _     �  m   �     G     Z     r     �  7   �     �     �     �       :   '  )   b  (   �     �  2   �  =   �  (   -  $   V      {     �     �  K   �       �     !   �  	   �  9   �  -   5  #   c  +   �  #   �  '   �  D   �  =   D  '   �  #   �  #   �  �   �      �     �     �  $   �  �  �  �   �  �  �  �   O  �   '  �     B   �  A   &   E  h   �   �!  d   _"  ?   �"  C   #     H#  ?   U#     �#     �#     �#     �#  %    $     &$  G   @$  5   �$     �$     �$  +   �$  1   %     :%  =   W%  1   �%  S   �%     &     6&  /   M&     }&     �&  =   �&  @   �&  o   !'  !   �'  P   �'  v   (  ^   {(  �   �(  m   �)  R   <*  -   �*     �*     �*  &   �*  <  +  Y   C,  Q   �,  u   �,  �   e-  1   .  �   @.  )   )/  '   S/  8   {/  '   �/  f   �/     C0  4   b0  &   �0  H   �0  ^   1  ;   f1  >   �1     �1  8   �1  C   12  C   u2  7   �2  2   �2     $3  ?   33  �   s3      4  �   /4     �4  
   �4  ]   �4  0   G5  A   x5  C   �5  8   �5  A   76  w   y6  b   �6  U   T7  ,   �7  1   �7    	8  (   &9     O9  !   g9  2   �9   
                        Please indicate the reminder period in minutes.

                        Example:

                        /{set_reminder_period} 30
                         
                        Please write the meetings time in the {iso8601} format with an offset relative to the UTC time zone.

                        You can calculate the time on the site {time_url}.

                        Example:

                        /{set_meetings_time} {sample_time}
                         
                        See you later, @{username}!

                        You can join via the /{command_join} command.
                         
                        You've just joined, @{username}!

                        You can skip meetings via the /{command_skip} command.
                         
        The bot can help you conduct daily (or at least regular) meetings.

        You can control me by sending these commands:
         @{username}, here is the default chat schedule. @{username}, here is your personal schedule. @{username}, please unblock @{bot_username} in your private chat with the bot so that the bot can send you reminders about missed daily meeting questions. @{username}, the bot doesn't have access to your personal messages.
Please write to @{bot_username} and type /start. A message with this title already exists.

{send_new_title} Add recurring message. An unexpected error occurred. {error} Cancel Cancel the current operation with the bot. Choose a language. Default Disable the bot. Enable the bot. English language selected! Enter again Error occurred while calculating the offset. Error saving language state: {error} Example:  Friday Get a help message. Get the chat state stored by the bot. Get the report. Invalid time format for '{time}'. {msg}
 Join meetings. Join only today's meeting. Meeting time! Monday Monday - Sunday Nice to meet you! No responses. Nobody has joined the meeting! OK, the interval was set to {new_interval}. OK, we'll meet at {meeting_time} on {week_days} starting not earlier than on {start_date}! Personal Please reply to these daily meeting questions: Press 'Cancel' to cancel editing this interval. Press 'Enter again' to enter the interval again. Press '{default}' to set working hours that will be used as default personal working hours by all people. Press '{personal}' to set personal working hours. Reminder period set to {period} minutes Reset the chat state. Saturday Save Schedule a personal vacation. Send a cron expression so that the bot knows the period of sending the message\.

Example: `4 5 \* \* \*`\.

Click [here]({cron_link}) if you need help with reading cron expressions\. Send a new interval in the 'hh:mm - hh:mm' format. Send a title with at most {N} symbols. Send an interval in the 'DD.MM.YYYY - DD.MM.YYYY' format.

Example: {example}. Send an interval so that the bot knows when to start and end sending the message.

{send_interval} Send the message text. Send the message title with at most {N} symbols so that the bot can use this title as the message identifier. Set meetings days. Set meetings time zone. Set meetings time. Set the bot language. Set the period of reminders about unanswered questions. Set up daily meetings. Set working hours. Skip meetings. Skip only today's meeting. Start date should be before the end date.

{send_interval} Start time must be earlier than end time. Successfully parsed interval: {interval} Sunday The interval is not in the 'hh:mm - hh:mm' format. The interval {interval} is not in the 'hh:mm - hh:mm' format. The title is too long.

{send_new_title} The {mode} schedule was not updated. The {mode} schedule was updated. Thursday Time must be in 'hh:mm' format. Tip: press the interval in the example to copy and then edit this interval. Tuesday Unfortunately, only supergroups and private chats are supported. Please promote this group to a supergroup by enabling the history of messages for new members or by enabling topics. Unschedule the personal vacation. Wednesday What (if anything) is blocking your progress? {usernames} What did you do last working day? {usernames} What will you do today? {usernames} Wrong cron expression format\.

{send_cron} Wrong date format.

{send_interval} Wrong interval format.

{send_interval} You have already responded to this message or it is no longer valid. You have to join daily meetings first!
Use the /join command. You should pass a valid time zone name. You've already joined, @{username}! You've not yet joined, @{username}! Your message {title} will be sent in between {interval_start} and {interval_end} {expression}.

Send /edit_recurring_messages to edit this and other recurring messages. Your response has been recorded. default personal {msg} (start: {start}, end: {end}).
 Project-Id-Version: PROJECT VERSION
Report-Msgid-Bugs-To: EMAIL@ADDRESS
POT-Creation-Date: 2024-07-22 00:24+0300
PO-Revision-Date: 2024-05-11 19:50+0300
Last-Translator: FULL NAME <EMAIL@ADDRESS>
Language: ru
Language-Team: ru <LL@li.org>
Plural-Forms: nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
MIME-Version: 1.0
Content-Type: text/plain; charset=utf-8
Content-Transfer-Encoding: 8bit
Generated-By: Babel 2.15.0
 
                        Пожалуйста, укажите период напоминания в минутах.

                        Например:

                        /{set_reminder_period} 30
 
                        Пожалуйста, укажите время встречи в формате {iso8601} с учетом смещения относительно часового пояса UTC.
                        Вы можете рассчитать время на сайте {time_url}.
                        Пример:
                        /{set_meetings_time} {sample_time}
                         
                        Увидимся позже, @{username}!
                        Вы можете присоединиться при помощи команды /{command_join} .
                         
                        Вы только что присоединились, @{username}!
                        Вы можете пропустить встречи с помощью команды /{command_skip}.
 
        Бот может помочь Вам проводить ежедневные встречи.

        Вы можете управлять ботом при помощи следующих команд:
         @{username}, вот график чата по умолчанию. @{username}, вот ваш персональный график. 
                            {username},  пожалуйста, разблокируйте {bot_username} в приватном чате,
                            чтобы бот мог отправлять Вам напоминания о пропущенных дейли вопросах.
                             @{username}, у бота нет доступа к Вашим личным сообщениям.
Пожалуйста, напишите @{bot_username} и введите /start. Сообщение с таким заголовком уже существует.

{send_new_title} Добавьте повторяющееся сообщение. Возникла непредвиденная ошибка. {error} Отмена Отмените текущую операцию с ботом. Выберите язык. По умолчанию Выключите бота. Включите бота. Выбран русский язык! Введите снова Возникла ошибка при вычислении сдвига. Ошибка сохранения языка! {error} Пример:  Пятница Получите это сообщение. Посмотрите состояние чата. Получите отчет. Неверный формат времени '{time}'. {msg}
 Просоединитесь к встречам. Присоединитесь только к сегодняшней встрече. Время встречи! Понедельник Понедельник - Воскресенье Привет! Нет ответов. Никто не присоединился к встрече! ОК, интервал установлен на {new_interval}. ОК, встретимся в {meeting_time} в(о) {week_days}, начиная не раньше {start_date}! Персональные часы Пожалуйста, ответьте на эти вопросы с дейли: Нажмите 'Отмена', чтобы отменить редактирование этого интервала. Нажмите 'Ввести снова', чтобы ввести интервал снова. Нажмите '{default}' чтобы установить рабочие часы, которые будут использоваться всеми людьми как персональные рабочие часы по умолчанию. Нажмите '{personal}' чтобы установить персональные рабочие часы. Период напоминаний установлен на {period} минут. Сбросьте состояние чата. Суббота Сохранить Запланируйте отпуск. Отправьте cron\-выражение, чтобы бот знал, с какой периодичностью отправлять сообщение\.

Пример: `4 5 \* \* \*`\.

Нажмите [здесь]({cron_link}) если вам нужна помощь по чтению cron\-выражений\. Отправьте новый интервал в 'чч:мм - чч:мм' формате. Отправьте заголовок с максимум {N} символами. Введите интервал в формате 'ДД.ММ.ГГГГ - ДД.ММ.ГГГГ'.

Пример: {example} Отправьте интервал, чтобы бот знал, когда начать и закончить отправлять сообщение.

{send_interval} Отправьте текст сообщения. Отправьте заголовок сообщения с максимум {N} символами, чтобы бот мог использовать этот заголовок как идентификатор сообщения. Установите дни встреч. Установите тайм зону. Установите время начала дейли. Установите язык бота. Установите период напоминаний о неотвеченных вопросах. Настройте дейли. Настройте Ваши рабочие часы. Пропускайте встречи. Пропустите только сегодняшнюю встречу. Дата начала должна быть раньше даты конца.

{send_interval} Начало должно быть раньше конца. Интервал успешно распаршен: {interval} Воскресенье Интервал не в формате 'hh:mm - hh:mm'. Интервал {interval} не в формате 'hh:mm - hh:mm'. Заголовок слишком длинный.

{send_new_title} Рабочие часы {mode} не обновлены. Рабочие часы {mode} обновлены. Четверг Время должно быть в 'чч:мм' формате. Совет: нажмите на интервал в примере, чтобы скопировать и далее отредактировать этот интервал Вторник К сожалению, бот поддерживает только супергруппы и приватные чаты. Пожалуйста Отмените отпуск. Среда Что (если такое есть) блокирует Ваш прогресс? {usernames} Что Вы делали вчера? {usernames} Что Вы будете делать сегодня? {usernames} Неверный формат cron-выражения.

{send_cron} Неверный формат даты.

{send_interval} Неверный формат интервала

{send_interval} Вы уже ответили на это сообщение или оно больше не действительно. Сначала присоединитесь к дейли!
Отправьте команду /join Передайте корректное название часового пояса. Вы уже подписаны, @{username}! Вы еще не подписаны, @{username}! Ваше сообщение '{title}' будет отправлено между {interval_start} and {interval_end} {expression}.

Отправьте /edit_recurring_messages, чтобы редактировать это и другие повторяющиеся сообщения. Ваш ответ был записан. по умолчанию персональные часы {msg} (начало: {start}, конец: {end}).
 