const { RESUME_LINK } = require('../src/config/data'); // Adjust path as needed

describe('Configuration Data Integrity', () => {
  // Test 1: Ensure the variable is defined and is a string
  it('should ensure the RESUME_LINK is a defined string value', () => {
    expect(RESUME_LINK).toBeDefined();
    expect(typeof RESUME_LINK).toBe('string');
  });

  // Test 2: Check for the required Google Drive identifier (specific to this link)
  it('should ensure the RESUME_LINK contains the correct Google Drive path structure', () => {
    // This checks if the link starts with the expected domain
    expect(RESUME_LINK).toMatch(/^https:\/\/drive\.google\.com\//);
    
    // This checks for the specific file ID pattern (a common source of errors)
    // The link contains 'd/' followed by the file ID, followed by '/view'
    expect(RESUME_LINK).toContain('/d/1ctPCTL5VVcnuldU1lb2lx2De2KtFjPtq/view?usp=sharing');
  });
  
  // Test 3: Check for proper query parameters to ensure file viewing access
  it('should ensure the RESUME_LINK has the correct viewing parameters', () => {
    // Checks for the necessary sharing parameters ('view?usp=sharing')
    expect(RESUME_LINK).toContain('view?usp=sharing');
  });

  // Test 4 (Optional but great for PM interviews): Prevent deployment without a link
  it('should ensure the RESUME_LINK is not an empty or placeholder string', () => {
    expect(RESUME_LINK.length).toBeGreaterThan(50); // Ensures it's not "TBD" or ""
  });
});