const userModel = require('../../app/models/user')
const {pool} = require('../../app/database/db')


describe('測試更新密碼' ,() => {
    it ('更新', async () => {
        try {
            const result = await userModel.updatePassword(4, 'changePassword')
            expect(result).toEqual(1)
        } catch (error) {
            throw error
        }finally {
            await pool.end()
        }
    })
})