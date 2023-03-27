import Role from '../models/role.models'

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount()

    if (count > 0) return

    const values = await Promise.all([
      new Role({ name: 'Super Admin', slug: 'super_admin' }).save(),
      new Role({ name: 'Admin', slug: 'admin' }).save(),
      new Role({ name: 'User', slug: 'user' }).save()
    ])

    console.log(values)
  } catch (error) {
    console.log(error)
  }
}
