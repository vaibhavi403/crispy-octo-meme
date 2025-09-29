// Test creating a profile with proper UUID
const { createClient } = require('@supabase/supabase-js')
const { randomUUID } = require('crypto')

const supabaseUrl = 'https://qcsysvkuaxmbiuyjkmjl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjc3lzdmt1YXhtYml1eWprbWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNDE2NjUsImV4cCI6MjA3NDcxNzY2NX0.QyqgNEnAMQ5nNV0ErqYvttAnjkzuAndSvfj7hi4fZOk'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testInsertWithUUID() {
  console.log('Testing profile creation with UUID...')
  
  const testData = {
    id: randomUUID(),
    role: 'client',
    email: 'test@example.com',
    first_name: 'Test',
    last_name: 'User',
    display_name: 'Test User'
  }
  
  console.log('Inserting test data:', testData)
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([testData])
      .select()
      .single()
    
    if (error) {
      console.log('Insert failed:', error)
      console.log('Error details:', JSON.stringify(error, null, 2))
    } else {
      console.log('Insert successful:', data)
      
      // Clean up - delete the test record
      const { error: deleteError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', testData.id)
      
      if (deleteError) {
        console.log('Cleanup failed:', deleteError)
      } else {
        console.log('Test record cleaned up successfully')
      }
    }
    
  } catch (err) {
    console.log('Unexpected error:', err.message)
  }
}

testInsertWithUUID()
