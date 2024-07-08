��    1      �              ,  �   -  �       �  @  �  �     �   �  �   V  k   �  *   H	     s	     �	  
   �	     �	  $   �	     �	      �	     
     )
     9
     H
     c
     q
     �
  >   �
  Z   �
     <  .   W  '   �     �  <   �     	          4     G  (   b     �     �     �     �  !   �  9     -   A  #   o  D   �  =   �  #     #   :      ^  �    Q  Y  �   �  �    �    �   �  �   �  �   �  �   X  5        7     S     k  %   �  5   �  &   �  0        5     U  0   t  T   �     �       >   #  x   b  o   �  +   K  l   w  R   �  '   7  h   _  $   �  ?   �  ?   -     m  d   �  ?   �  #   ,  G   P  (   �     �  _   �  2   ?   <   r   x   �   �   (!  8   �!  1   �!  '   ,"   
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
        I can help you conduct daily (or at least regular) meetings.

        You can control me by sending these commands:
         @{username} I don't have access to your personal messages.
Please write to @{bot_username} and type /start. Cancel the current operation with the bot. Chat information commands Disable me. Enable me. English language selected! Error saving language state: {error} Get a help message. Get the chat state that I store. Get the report. Global commands Join meetings. Join only today's meeting. Meeting time! Nice to meet you! Nobody has joined the meeting! OK, from now you will only receive messages on {meeting_days}. OK, we'll meet at {meeting_time} on {week_days} starting not earlier than on {start_date}! Personal settings commands Please reply to these daily meeting questions: Reminder period set to {period} minutes Schedule a personal vacation. Set how often you'll be reminded about unanswered questions. Set meetings days. Set meetings time zone. Set meetings time. Set my interface language. Set the days when you can join meetings. Set up regular meetings. Skip meetings. Skip only today's meeting. Team settings commands Unschedule the personal vacation. What (if anything) is blocking your progress? {usernames} What did you do last working day? {usernames} What will you do today? {usernames} You have already responded to this message or it is no longer valid. You have to join daily meetings first!
Use the /join command. You've already joined, @{username}! You've not yet joined, @{username}! Your response has been recorded. Project-Id-Version: PROJECT VERSION
Report-Msgid-Bugs-To: EMAIL@ADDRESS
POT-Creation-Date: 2024-07-07 02:28+0300
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
                            {username}, пожалуйста, разблокируйте {bot_username} (это я) в нашем приватном чате
                            чтобы я мог отправлять вам напоминания о пропущенных вопросах daily.
                             
                        Пожалуйста, укажите период напоминания в минутах.

                        Например:

                        /{set_reminder_period} 30
 
                        Пожалуйста, укажите свои личные рабочие дни.

                        Вам следует использовать "," или " " в качестве разделителя.

                        Пример:

                        /{set_personal_meetings_days} Понедельник-Среда, Пятница 
                         
                        Пожалуйста, укажи время встречи в формате {iso8601} с учетом смещения относительно часового пояса UTC.
                        Ты можешь рассчитать время на сайте {time_url}.
                        Пример:
                        /{set_meetings_time} {sample_time}
                         
                        Увидемся позже, @{username}!
                        Ты можешь присоедениться при помощи команды /{command_join} .
                         
                        Ты только что присоединился(лась), @{username}!
                        Вы можете пропустить встречи с помощью команды /{command_skip}.
 
        Я могу помочь тебе проводить ежедневные встречи.

        Ты можешь управлять мной при помощи следующих команд:
         @{username}, у меня нет доступа к вашим личным сообщениям.
Пожалуйста, напиши @{bot_username} и введи /start. Заверши мою текущую операцию Настройки чата Выключи меня Включи меня Выбран русский язык! Ошибка сохранения языка! {error} Получи это сообщение Посмотреть состояние бота Запросить репорт Оcновные команды Просоединиться к встречам Присоедини́ться только к сегодняшней встрече Время встречи! Привет! Никто не присоединился ко встрече ОК, с этого момента вы будете получать сообщения только в {meeting_days}. ОК, встретимся в {meeting_time} в(о) {week_days}, начиная не раньше {start_date}! Персональные настройки Пожалуйста, ответьте на эти вопросы ежедневного совещания: Период напоминания установлен на {period} минут. Запланировать отпуск Установить частоту напоминаний о неотвеченных вопросах. Установи дни встреч Установи время и дату начала дейли Установи время и дату начала дейли Установи язык Выбрать день, когда ты можешь присоединиться к встрече Установи время и дату начала дейли Пропустить встречи Пропустить только сегодняшнюю встречу Настройки для команды Отменить отпуск Что (если такое есть) блокирует твой прогресс {usernames}? Что ты делал(а) вчера? {usernames} Что будешь делать сегодня? {usernames} Вы уже ответили на это сообщение, или оно больше не действительно. Сначала вам нужно присоединиться к ежедневным совещаниям!
Используйте команду /join. Ты уже подписался(лась), @{username}! Ты и так подписан(а), @{username}! Ваш ответ был записан 