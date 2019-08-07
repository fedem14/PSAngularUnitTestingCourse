import {StrengthPipe} from './strength.pipe';

describe('strengh pipe', () => {
  it('should display weak if the strength is 5', () => {
    let pipe = new StrengthPipe(); // arrange

    expect(pipe.transform(5)).toBe('5 (weak)'); // act and assert
  });
});
