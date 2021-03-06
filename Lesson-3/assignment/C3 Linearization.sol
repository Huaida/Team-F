contract O
contract A is O
contract B is O
contract C is O
contract K1 is A, B
contract K2 is A, C
contract Z is K1, K2

https://en.wikipedia.org/wiki/C3_linearization
https://blog.tedxiong.com/C3_Linearization.html

solidity的继承链是靠右的更近，这点和python不一样

L[O] = [O]
L[A] = [A,O]
L[B] = [B,O]
L[C] = [C,O]
L[k1] = [K1]+merge(L[B],L[A],[B,A])  // merge规则：按照继承顺序加入merge，最后再加一个所有父类顺序添加的序列
      = [K1]+merge([B,O],[A,O],[B,A]) // 规则：取一个元素（它是其他序列中的第一个元素，或不在其他序列出现,如果有多个元素符合，选前面一个）加到最前序列后面
      = [K1,B]+merge([O],[A,O],[A])
      = [K1,B,A,O]
L[K2] = [k2,C,A,O]
L[Z]  = [Z] + merge(L[K2],L[K1],[K2,K1])
      = [Z] + merge([K2,C,A,O],[k1,B,A,O],[K2,K1])
      = [Z,K2,C,K1,B,A,O]
