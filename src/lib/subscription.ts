export async function subscribeUser(planId: string): Promise<boolean> {
    // Simulate a successful subscription for now
    console.log(`Subscribing user to plan: ${planId}`)
  
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // In a real app, you'd call a backend endpoint or third-party API here
    return true
  }
  