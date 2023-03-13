export const issamevalue = {
  name: 'issamevalue',
  validate: (input : string, secondInput :string) => input && secondInput ? input === secondInput : false
}