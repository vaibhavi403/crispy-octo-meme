import { Profile } from "@/types/profile"

// Demo user profiles for testing
export const demoUsers: Profile[] = [
  // Client users
  {
    id: "demo-client-1",
    role: "client",
    email: "john.doe@example.com",
    first_name: "John",
    last_name: "Doe",
    display_name: "John Doe",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    dob: "1985-06-15",
    bio: "Food enthusiast who loves trying different cuisines. Looking for professional chefs to create amazing dining experiences at home.",
    profile_image_path: "/placeholder-user.jpg",
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-client-2", 
    role: "client",
    email: "priya.sharma@example.com",
    first_name: "Priya",
    last_name: "Sharma",
    display_name: "Priya Sharma",
    phone: "+91 87654 32109",
    location: "Delhi, NCR",
    dob: "1990-03-22",
    bio: "Working professional who enjoys hosting dinner parties. Love North Indian and Continental cuisine.",
    profile_image_path: "/happy-indian-working-mother-testimonial.jpg",
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-client-3",
    role: "client", 
    email: "raj.patel@example.com",
    first_name: "Raj",
    last_name: "Patel",
    display_name: "Raj Patel",
    phone: "+91 76543 21098",
    location: "Bangalore, Karnataka",
    dob: "1988-11-08",
    bio: "Tech professional with a passion for authentic Indian regional cuisines. Always excited to try new dishes.",
    profile_image_path: "/indian-tech-professional.jpg",
    created_at: new Date().toISOString(),
  },

  // Chef users
  {
    id: "demo-chef-1",
    role: "chef",
    email: "chef.arun@example.com", 
    first_name: "Arun",
    last_name: "Kumar",
    display_name: "Chef Arun Kumar",
    phone: "+91 65432 10987",
    location: "Mumbai, Maharashtra",
    dob: "1982-04-12",
    bio: "Professional chef with 10+ years of experience in North Indian and Mughlai cuisine. Specialized in traditional tandoor cooking and authentic spices.",
    profile_image_path: "/professional-indian-male-chef-in-white-uniform-coo.jpg",
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-chef-2",
    role: "chef",
    email: "chef.meera@example.com",
    first_name: "Meera",
    last_name: "Singh", 
    display_name: "Chef Meera Singh",
    phone: "+91 54321 09876",
    location: "Delhi, NCR",
    dob: "1987-09-25",
    bio: "Passionate female chef specializing in healthy Indian cuisine and continental dishes. Expert in creating nutritious and delicious meals.",
    profile_image_path: "/professional-indian-female-chef-smiling-in-kitchen.jpg",
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-chef-3",
    role: "chef",
    email: "chef.giuseppe@example.com",
    first_name: "Giuseppe",
    last_name: "Romano",
    display_name: "Chef Giuseppe Romano", 
    phone: "+91 43210 98765",
    location: "Bangalore, Karnataka",
    dob: "1985-07-30",
    bio: "Italian chef bringing authentic Mediterranean flavors to India. Expert in pasta, risotto, and traditional Italian cooking techniques.",
    profile_image_path: "/professional-italian-chef.jpg",
    created_at: new Date().toISOString(),
  }
]

// Function to get a random demo user
export function getRandomDemoUser(): Profile {
  const randomIndex = Math.floor(Math.random() * demoUsers.length)
  return demoUsers[randomIndex]
}

// Function to get demo user by role
export function getDemoUsersByRole(role: "client" | "chef"): Profile[] {
  return demoUsers.filter(user => user.role === role)
}

// Function to get demo user by ID
export function getDemoUserById(id: string): Profile | undefined {
  return demoUsers.find(user => user.id === id)
}

// Function to create a demo login session
export function createDemoSession(userEmail?: string): Profile {
  let user: Profile
  
  if (userEmail) {
    user = demoUsers.find(u => u.email === userEmail) || getRandomDemoUser()
  } else {
    user = getRandomDemoUser()
  }
  
  // Store in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user))
    console.log('Demo session created for user:', user.display_name, 'Role:', user.role)
  }
  
  return user
}
