import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../Hooks/useGetConversations'
import { getRandomemoji } from '../../utils/emojis';

const Conversations = () => {
  const {loading,conversations} =useGetConversations();
  console.log("CONVERSATIONS:", conversations)
  return (
    
    <div className=' py-3 flex flex-col overflow-auto'>

        {conversations.map((conversation,idx) =>(
          <Conversation 
          key={conversation.id} conversation={conversation}
          emoji={getRandomemoji()}
          lastIdx= {idx === conversations.length - 1}
          />
          ))}
          
        {loading? <span className='loading loading-spinner mx-auto'></span> :null }
    </div>
  
  );
}

export default Conversations

// STARTER CODE SNIPET

// import React from 'react'
// import Conversation from './Conversation'

// const Conversations = () => {
//   return (
//     <div className=' py-3 flex flex-col overflow-auto'>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//         <Conversation/>
//     </div>
//   )
// }

// export default Conversations