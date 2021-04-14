const write = (data) => {
  process.stdout.write(data);
};

const reverse = (value) => {
  return value.trim().split('').reverse().join('');
};

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if(chunk !== null) {
    const str = chunk.toString();
    write(reverse(str));
  }
});
