int square (int x) {
  return x * x;
}

int plus (int x) {
  return ++x;
}

int minus (int x) {
  return --x;
}

int factorial (int x) {
  if (x > 10) {
    return -1;
  } else if (x < 2) {
    return x;
  } else {
    return x * factorial(x-1);
  }
}