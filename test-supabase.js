// Quick test to check Supabase connection and table structure
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://qcsysvkuaxmbiuyjkmjl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjc3lzdmt1YXhtYml1eWprbWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNDE2NjUsImV4cCI6MjA3NDcxNzY2NX0.QyqgNEnAMQ5nNV0ErqYvttAnjkzuAndSvfj7hi4fZOk'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  console.log('Testing Supabase connection...')
  
  try {
    // Try to fetch from profiles table to see if it exists and what structure it has
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
    
    if (error) {
      console.log('Error accessing profiles table:', error)
      
      // If profiles table doesn't exist, let's try to see what tables do exist
      console.log('Trying to list all tables...')
      const { data: tables, error: tablesError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
      
      if (tablesError) {
        console.log('Cannot list tables:', tablesError)
      } else {
        console.log('Available tables:', tables)
      }
    } else {
      console.log('Profiles table exists and is accessible')
      console.log('Sample data:', data)
    }
    
  } catch (err) {
    console.log('Connection failed:', err.message)
  }
}

testConnection()
