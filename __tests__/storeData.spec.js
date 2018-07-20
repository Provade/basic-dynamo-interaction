'use strict'

const sut = require('../awsInteractions')

describe('Store Data', () => {
    it('Should prove the SUT exists', async () => {
        expect.assertions(1)
        expect(sut).toBeDefined()
    })

    it('Should prove specified method in SUT exists', async () => {
        expect.assertions(1)
        expect(sut.storeData).toBeDefined()
    })

    it('Should return success message when given valid parameters', async () => {
        expect.assertions(1)
        const result = await sut.storeData(mockDynamo, 'Table', {})
        expect(result).toEqual({ message: 'SUCCESS' })
    })

    it('Should throw error when given invalid parameters', async () => {
        expect.assertions(1)
        await expect(sut.storeData(mockDynamo, null, null)).rejects.toEqual({ message: 'ERROR' })
    })
})


const mockDynamo = {
    putItem: (params) => {
        if (!params.TableName) {
            return { promise: jest.fn().mockImplementation(() => Promise.reject({ message: 'ERROR' })) }
        }
        return { promise: jest.fn().mockImplementation(() => Promise.resolve({ message: 'SUCCESS' })) }
    }
}

