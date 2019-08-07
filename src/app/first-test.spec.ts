describe('My first test', () => {
  let sut; /* Short for system under test */

  beforeEach(() => {
    sut = {}; // Resets to its initial state
  });

  it('should be true if true', () => {
    sut.a = false; // arrange
    sut.a = true; // act
    expect(sut.a).toBe(true); // assert
  });
});
