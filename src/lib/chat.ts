import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { firebaseApp } from "./firebase"

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

// Function to send a message to the OpenAI API and store in Firestore
export async function sendMessage(message: string): Promise<string> {
  const user = auth.currentUser
  if (!user) {
    throw new Error("User not authenticated")
  }

  try {
    // Get conversation history for context
    const history = await getConversationHistory()
    const conversationContext = history
      .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n")

    // Prepare the prompt with conversation history for context
    const prompt = `
Previous conversation:
${conversationContext}

User: ${message}`
    // Simulate sending the message and return a response
    const response = `Message received: ${message}`;
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message");
  }
}

// Function to get conversation history from Firestore
 export async function getConversationHistory(): Promise<any[]> {
  const user = auth.currentUser
  if (!user) {
    throw new Error("User not authenticated")
  }

  const chatRef = collection(db, `users/${user.uid}/chats`)
  const q = query(chatRef, orderBy("createdAt"))

  const querySnapshot = await getDocs(q)
  const history: any[] = []
  querySnapshot.forEach((doc) => {
    history.push(doc.data())
  })

  return history
}

