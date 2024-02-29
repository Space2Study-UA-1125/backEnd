const mockOfferData = {
  price: '200',
  proficiencyLevel: ['Advanced'],
  title: 'this is a new title for test purposes',
  description: 'Lorem ipsum dolor sit amet consectetur',
  languages: ['English', 'Ukrainian'],
  subject: '63da8767c9ad4c9a0b0eacd3',
  category: '63525e23bf163f5ea609ff2b',
  FAQ: [
    {
      question: 'offer question',
      answer: 'offer answer'
    }
  ]
}

const updateData = {
  price: '400'
}

jest.mock('~/models/offer', () => {
  return {
    create: jest.fn().mockResolvedValue(mockOfferData)
  }
})

jest.mock('~/utils/errorsHelper', () => ({
  ...jest.requireActual('~/utils/errorsHelper'),
  createForbiddenError: jest.fn()
}))

const offerService = require('~/services/offer')
const Offer = require('~/models/offer')

describe('offerService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create a new offer', async () => {
    const author = 'someAuthorId'
    const authorRole = 'someRole'
    const data = mockOfferData

    const newOffer = await offerService.createOffer(author, authorRole, data)

    expect(Offer.create).toHaveBeenCalledWith({
      author,
      authorRole,
      ...data
    })

    expect(newOffer).toEqual(mockOfferData)
  })

  it('should update an offer if the user is the author', async () => {
    const id = 'someOfferId'
    const currentUserId = 'AuthorUserId'
    const mockOffer = {
      ...mockOfferData,
      _id: id,
      author: currentUserId,
      validate: jest.fn(),
      save: jest.fn()
    }

    Offer.findById = jest.fn().mockResolvedValue(mockOffer)

    await offerService.updateOffer(id, currentUserId, updateData)

    expect(Offer.findById).toHaveBeenCalledWith(id)

    expect(mockOffer.save).toHaveBeenCalled()

    expect(mockOffer.price).toBe(updateData.price)
  })

  //   it('should not update an offer if the user is not the author', async () => {
  //     const id = 'someOfferId'
  //     const currentUserId = 'NotAuthorUserId'

  //     const mockOffer = {
  //       ...mockOfferData,
  //       _id: id,
  //       author: 'AuthorUserId',
  //       validate: jest.fn(),
  //       save: jest.fn()
  //     }

  //     Offer.findById = jest.fn().mockResolvedValue(mockOffer)

  //     await offerService.updateOffer(id, currentUserId, anotherUpdateData)

  //     expect(Offer.findById).toHaveBeenCalledWith(id)

  //     // Перевірка, що метод save не був викликаний
  //     expect(mockOffer.save).not.toHaveBeenCalled()
  // })

  it('should delete an offer if the user is the author', async () => {
    const id = 'someOfferId'
    const currentUserId = 'AuthorUserId'

    const mockOffer = {
      _id: id,
      author: currentUserId
    }

    Offer.findById = jest.fn().mockResolvedValue(mockOffer)
    Offer.findByIdAndRemove = jest.fn().mockResolvedValue(mockOffer)

    await offerService.deleteOffer(id, currentUserId)

    expect(Offer.findById).toHaveBeenCalledWith(id)
    expect(Offer.findByIdAndRemove).toHaveBeenCalledWith(id)
  })

  //   it('should not delete an offer if the user is not the author', async () => {
  //     const id = 'someOfferId';
  //     const currentUserId = 'NotAuthorUserId';

  //     const mockOffer = {
  //       _id: id,
  //       author: 'AuthorUserId',
  //     };

  //     Offer.findById = jest.fn().mockResolvedValue(mockOffer);

  //     await expect(offerService.deleteOffer(id, currentUserId)).rejects.toThrowError(createForbiddenError());

  //     expect(Offer.findById).toHaveBeenCalledWith(id);
  //     expect(Offer.findByIdAndRemove).not.toHaveBeenCalled();
  //   });
})
