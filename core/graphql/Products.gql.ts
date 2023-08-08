
import { gql } from "@apollo/client";



export const LOAD_NEW_PRODUCT = gql`
query products {
  products(where: {orderby: {field: DATE, order: ASC}}, first: 50) {
    nodes {
      productId
      image {
        sourceUrl
      }
      name
      ... on SimpleProduct {
        id
        name
        price
        image {
          uri
          link
          altText
          sourceUrl
        }
      }
      ... on ExternalProduct {
        id
        name
        price
        image {
          uri
          link
          altText
          sourceUrl
        }
      }
      ... on VariableProduct {
        id
        name
        price
        image {
          uri
          link
          altText
          sourceUrl
        }
      }
      ... on GroupProduct {
        id
        name
        price
        image {
          uri
          link
          altText
          sourceUrl
        }
      }
    }
  }
}
`
export const LOAD_CATEGORY_MUTATION = gql`
query productCategories{  
  
  productCategories {
    nodes {
      id
      name
      slug
      image{
        sourceUrl
      }
      ancestors{
        nodes{
          id
          name
          image{
            altText
            sourceUrl
          }
          count
        }
      }
      uri
      display
      count

    }
  }

}
`;



export const NUMBER_OF_PRODUCT_BY_CATEGORY = gql`
query productCategories($category: String = "xxx") {
  products(first: 1000, where: {category: $category}) {
    edges {
      node {
        id
      }
    }
  }
}
`

export const LOAD_SUBCATEGORY_BY_CATEGORY = gql`
query productCategories($id: ID = "dGVybToxMTU=") {
  productCategory(id: $id) {
    children {
      nodes {
        name
        id
      }
    }
  }
}
`



export const PRODUCT_BY_CATEGORY = gql`
query products($maxPrice: Float = 999999999999, $minPrice: Float = 0, $category: String = "", $categoryIn: [String] = "Bagages") {
  products(
    where: {orderby: {field: DATE, order: ASC}, maxPrice: $maxPrice, minPrice: $minPrice, categoryIn: $categoryIn, category: $category}
    first: 200
  ) {
    nodes {
      productId
      image {
        altText
        id
        title
        uri
      }
      name
      ... on SimpleProduct {
        id
        name
        price
        image {
          uri
          link
          altText
          sourceUrl
        }
      }
      ... on ExternalProduct {
        id
        name
        price
        image {
          uri
          link
          altText
          sourceUrl
        }
      }
      ... on VariableProduct {
        id
        name
        price
        image {
          uri
          link
          altText
          sourceUrl
        }
      }
      ... on GroupProduct {
        id
        name
        price
        image {
          uri
          link
          altText
          sourceUrl
        }
      }
    }
  }
}
`;


export const PRODUCT_SEARCH = gql`
query products($search: String = "") {
  products(
    where: {orderby: {field: DATE, order: ASC},search: $search}
    first: 10
  ) {
    nodes {
      productId
      image {
        altText
        id
        title
        uri
      }
      name
      ... on SimpleProduct {
        id
        name
        price
        image {
          uri
          link
          altText
          sourceUrl
        }
      }
      ... on ExternalProduct {
        id
        name
        price
        image {
          uri
          link
          altText
          sourceUrl
        }
      }
      ... on VariableProduct {
        id
        name
        price
        image {
          uri
          link
          altText
          sourceUrl
        }
      }
      ... on GroupProduct {
        id
        name
        price
        image {
          uri
          link
          altText
          sourceUrl
        }
      }
    }
  }
}
`;




export const LOAD_PRODUCT_DESCRIPTION_QUERY = gql`
query product($id: ID!)   {
  product(id: $id) {
    sku
    title
    image{
      sourceUrl
    }
    productId
    ... on VariableProduct {
      id
      name
      salePrice
      height
      price
      sku
      width
      weight
      title
      reviews {
        nodes {
          content
          date
          id
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
        }
      }
      image{
        sourceUrl
      }
      stockQuantity
      status
      allPaTaille {
        nodes {
          count
          name
          id
          products {
            nodes {
              averageRating
              galleryImages {
                nodes {
                  sourceUrl
                }
              }
              name
              sku
              slug
              status
            }
          }
        }
      }
      allPaCouleur {
        nodes {
          name
        }
      }
    }
    ... on ExternalProduct {
      id
      name
      salePrice
      price
      sku
      title
      status
      reviews {
        nodes {
          content
          date
          id
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
        }
      }
    }
    ... on GroupProduct {
      id
      name
      price
      sku
      title
      status
      reviews {
        nodes {
          content
          date
          id
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
        }
      }
    }
    ... on SimpleProduct {
      id
      name
      salePrice
      height
      price
      sku
      width
      weight
      title
      stockQuantity
      status
      reviews {
        nodes {
          content
          date
          id
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
        }
      }
    }
    averageRating
    reviewCount
    shortDescription
    name
    galleryImages {
      nodes {
        sourceUrl
      }
    }
    related {
      nodes {
        ... on VariableProduct {
          id
          name
          image {
            sourceUrl
          }
        }
        ... on ExternalProduct {
          id
          name
          image {
            sourceUrl
          }
        }
        ... on SimpleProduct {
          id
          name
          image {
            sourceUrl
          }
        }
      }
    }
  }
}
`;


export const LOAD_PRODUCT_BY_REVIEW_ID = gql`
query product($id: ID!) {
  product(id: $id) {
    productId
    ... on VariableProduct {
      id
    }
    ... on ExternalProduct {
      id

       reviews {
            nodes {
              status
              type
              content
              
              date
              id
              author {
                node {
                  name
                  avatar {
                    url
                  }
                }
              }
            }
          }
    }
    ... on GroupProduct {
      id
       reviews {
            nodes {
              content
              date
              id
              author {
                node {
                  name
                  avatar {
                    url
                  }
                }
              }
            }
          }
    }
    ... on SimpleProduct {
      id
       reviews {
            nodes {
              status
              agent
              karma
              
              content
              date
              id
              author {
                node {
                
                  name
                  avatar {
                    url
                  }
                }
              }
            }
          }
    }
    averageRating
    reviewCount
    related {
      nodes {
        ... on VariableProduct {
          id
          name
          productId
          image{
            sourceUrl
          }

        }
        ... on ExternalProduct {
          id
          name
          productId
          image{
            sourceUrl
          }

        }
        ... on SimpleProduct {
          id
          name
          productId
          image{
            sourceUrl
          }
        }
      }
    }
  }
}
`

export const CKECKOUT_MUTATION = gql`
mutation CHECKOUT_MUTATION( $input: CheckoutInput! ) {
  checkout(input: $input) {
    clientMutationId
    order {
      id
      orderKey
      orderNumber
      status
      refunds {
        nodes {
          amount
        }
      }
    }
    result
    redirect
  }
}
`


export const LOAD_ORDERS = gql`
query orders($customerId: Int = 10) {
  orders(where: {customerId: $customerId}) {
    nodes {
      id
      date
      datePaid
      orderKey
      orderNotes {
        nodes {
          content
        }
      }
      orderNumber
      total
      paymentMethod
      lineItems {
        nodes {
          product {
            node {
              image {
                sourceUrl
              }
              name
            }
          }
        }
      }
    }
  }
}
`


export const PAYEMENT_GATEWAYS = gql`
query paymentGateways {
  paymentGateways {
    edges {
      node {
        id
        icon
        title
      }
    }
  }
}
`