# Shiritori-WebAPP

A web-based Japanese Shiritori game built with HTML, CSS, and JavaScript.

## Features

- Play the traditional Japanese word game "Shiritori" in your browser
- Only hiragana characters can be used
- Follow general shiritori rules (next word must start with the last character of the previous word)
- User loses when their input ends with "ん"
- User wins when the app response ends with "ん"
- Proper handling of "Dakuten" (e.g., "か" & "が", "ぱ" & "ぱ" are treated as different characters)
- Small characters "ゃ", "ゅ", "ょ" are properly treated as "や", "ゆ", "よ"
- Visual feedback for win/lose conditions
- Game history tracking
- Reset functionality

## How to Play

1. Enter a Japanese word in hiragana in the input field
2. Click the "送信" (submit) button
3. The app will respond with a word that starts with the last character of your word
4. Continue the game by entering a new word that starts with the last character of the app's response
5. If your word ends with "ん", you lose
6. If the app's response ends with "ん", you win
7. Click the "リセット" (reset) button to start a new game

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
