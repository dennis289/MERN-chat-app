export const funEmojis=[
    "😄", "😊", "😃", "😉", "😍", "🤩", "😎", "🥳", "😜", "🤪",
     "😂", "🤣", "😆", "😁", "😀", "🙂", "🙃", "😇", "😛", "😝",
     "😋", "😚", "😘", "😗", "😙", "🥰", "😻", "🤗", "🤭", "🤫",
     "🤔", "🤨", "😏", "🙄", "😴", "🥱", "😪", "😫", "😌", "😴"
]
export const getRandomemoji=() =>{
    return funEmojis[Math.floor(Math.random()*funEmojis.length)]
}