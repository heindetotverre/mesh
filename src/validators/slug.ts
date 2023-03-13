export const slug = {
  name: 'slug',
  validate: (input: string) => {
    if (input) {
      return !!(input.charAt(0) === '/')
    } else {
      return false
    }
  }
}