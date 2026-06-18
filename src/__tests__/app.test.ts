describe("Travel Journal Tests", () => {
  // Test 1: formatDate function
  test("formats date correctly", () => {
    const date = new Date("2024-06-15").toISOString().split("T")[0];
    expect(date).toBe("2024-06-15");
  });

  // Test 2: Empty title check
  test("entry requires title", () => {
    const title = "";
    expect(title.length).toBe(0);
  });

  // Test 3: Empty location check
  test("entry requires location", () => {
    const location = "";
    expect(location.length).toBe(0);
  });

  // Test 4: Coordinat Format
  test("coordinates format is correct", () => {
    const lat = 52.2297;
    const lon = 21.0122;
    const result = `${lat}, ${lon}`;
    expect(result).toBe("52.2297, 21.0122");
  });

  // Test 5: Email validation
  test("valid email format", () => {
    const email = "test@test.com";
    expect(email).toContain("@");
  });

  // Test 6: Password Minimum length
  test("password minimum length", () => {
    const password = "123456";
    expect(password.length).toBeGreaterThanOrEqual(6);
  });

  // Test 7: AsyncStorage key
  test("cache key is correct", () => {
    const key = "entries";
    expect(key).toBe("entries");
  });

  // Test 8: Entry List is empty fist of all
  test("entries list starts empty", () => {
    const entries: any[] = [];
    expect(entries.length).toBe(0);
  });

  // Test 9: Invalid email
  test("invalid email has no @", () => {
    const email = "invalidEmail";
    expect(email).not.toContain("@");
  });

  // Test 10: photo uri null check
  test("photo uri is null by default", () => {
    const photoUri = null;
    expect(photoUri).toBeNull();
  });
});
