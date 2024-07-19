��    /      �                �     �   �    �  @  �  �   �  �   �  �   6  �   �  k   b	  *   �	     �	     

     
  $   5
     Z
  %   n
     �
     �
     �
     �
     �
     �
  >     Z   L  .   �  '   �     �          2     E     ]     p  (   �  7   �     �     �       !   (  9   J  -   �  #   �  D   �  =     #   Y  #   }      �  �  �  X  �  �   �  �  �  �  U  �     �   �  �   �  �   y  �   O  ?         @     ]  %   x  5   �  +   �  1         2  1   O  S   �     �     �  =   �  x   <  o   �  P   %  R   v  -   �  (   �  )      '   J  8   r  '   �  e   �  f   9     �  &   �  H   �     /   ^   N   1   �   B   �   w   "!  b   �!  ,   �!  1   *"  (   \"   
                            {username}, please unblock {bot_username} (it's me) in our private chat
                            so that I can send you reminders about missed daily meeting questions.
                             
                        Please indicate the reminder period in minutes.

                        Example:

                        /{set_reminder_period} 30
                         
                        Please indicate your personal working days.

                        You should use "," or " " as a separator.

                        Example:

                        /{set_personal_meetings_days} Monday-Wednesday, Friday 
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
                The state has been successfully reset. 
                
                Use the /get_chat_state command to view the current state.
                 
        I can help you conduct daily (or at least regular) meetings.

        You can control me by sending these commands:
         @{username} I don't have access to your personal messages.
Please write to @{bot_username} and type /start. Cancel the current operation with the bot. Disable the bot. Enable the bot. English language selected! Error saving language state: {error} Get a help message. Get the chat state stored by the bot. Get the report. Join meetings. Join only today's meeting. Meeting time! Nice to meet you! Nobody has joined the meeting! OK, from now you will only receive messages on {meeting_days}. OK, we'll meet at {meeting_time} on {week_days} starting not earlier than on {start_date}! Please reply to these daily meeting questions: Reminder period set to {period} minutes Reset the chat state. Schedule a personal vacation. Set meetings days. Set meetings time zone. Set meetings time. Set the bot language. Set the days when you can join meetings. Set the period of reminders about unanswered questions. Set up daily meetings. Skip meetings. Skip only today's meeting. Unschedule the personal vacation. What (if anything) is blocking your progress? {usernames} What did you do last working day? {usernames} What will you do today? {usernames} You have already responded to this message or it is no longer valid. You have to join daily meetings first!
Use the /join command. You've already joined, @{username}! You've not yet joined, @{username}! Your response has been recorded. Project-Id-Version: PROJECT VERSION
Report-Msgid-Bugs-To: EMAIL@ADDRESS
POT-Creation-Date: 2024-07-19 12:37+0300
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
                            {username},  пожалуйста, разблокируйте {bot_username} (это я) в нашем приватном чате,
                            чтобы я мог отправлять Вам напоминания о пропущенных дейли вопросах.
                             
                        Пожалуйста, укажите период напоминания в минутах.

                        Например:

                        /{set_reminder_period} 30
 
                        Пожалуйста, укажите свои персональные рабочие дни.

                        Используйте "," или " " в качестве разделителя.

                        Пример:

                        /{set_personal_meetings_days} Понедельник-Среда, Пятница 
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
 Состояние чата успешно сброшено.Используйте команду /get_chat_state, чтобы посмотреть текущее состояние чата. 
        Я могу помочь Вам проводить ежедневные встречи.

        Вы можете управлять мной при помощи следующих команд:
         @{username}, у меня нет доступа к Вашим личным сообщениям.
Пожалуйста, напишите @{bot_username} и введите /start. Отмените текущую операцию с ботом. Выключите бота. Включите бота. Выбран русский язык! Ошибка сохранения языка! {error} Получите это сообщение. Посмотрите состояние чата. Получите отчет. Просоединитесь к встречам. Присоединитесь только к сегодняшней встрече. Время встречи! Привет! Никто не присоединился к встрече! ОК, с этого момента Вы будете получать сообщения только в {meeting_days}. ОК, встретимся в {meeting_time} в(о) {week_days}, начиная не раньше {start_date}! Пожалуйста, ответьте на эти вопросы с дейли: Период напоминаний установлен на {period} минут. Сбросьте состояние чата. Запланировать отпуск. Установите дни встреч. Установите тайм зону. Установите время начала дейли. Установите язык бота. Выберите дни, когда Вы можете присоединиться к встрече. Установите период напоминаний о неотвеченных вопросах. Настройте дейли. Пропускайте встречи. Пропустите только сегодняшнюю встречу. Отменить отпуск. Что (если такое есть) блокирует Ваш прогресс, @{username}? Что Вы делали вчера, @{username}? Что Вы будете делать сегодня, @{username}? Вы уже ответили на это сообщение или оно больше не действительно. Сначала присоединитесь к дейли!
Отправьте команду /join Вы уже подписаны, @{username}! Вы еще не подписаны, @{username}! Ваш ответ был записан. 