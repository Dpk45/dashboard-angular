export const API_KEYS = {
    'stevenalanoptical': {
        'api_key': 'stevenalanoptical_dev',
        'abbrev': 'SAO',
        'url': 'http://www.stevenalanoptical.com',
        'htk': {
            'courier': 'USPS',
        },
        'labs': ['kmarsoptical']
    },
    'classicspecs': {
        'api_key': 'classicspecs_dev',
        'abbrev': 'CS',
        'url': 'http://www.classicspecs.com',
        'htk': {
            'courier': 'USPS',
        },
        'labs': ['kmarsoptical', 'tro']
    },
    'ano': {
        'api_key': 'ano_dev',
        'abbrev': 'AnO',
        'url': 'http://localhost',
        'htk': {
            'courier': 'USPS',
        },
        'labs': ['kmarsoptical']
    },
    'ottavo': {
        'api_key': 'ottavo_dev',
        'abbrev': 'OTT',
        'url': 'http://www.getottavo.com',
        'htk': {
            'courier': 'USPS',
        },
        'no_lab': [
            {
                'key': 'lens_type',
                'values': ['READING_LENS']
            },
            {
                'key': 'rx.right.sphere',
                'values': [1.0, 1.5, 2.0, 2.5]
            },
            {
                'key': 'rx.left.sphere',
                'values': [1.0, 1.5, 2.0, 2.5]
            }
        ]
    },
    'jasonwu': {
        'api_key': 'jasonwu_dev',
        'abbrev': 'JWu',
        'url': 'http://localhost',
        'htk': {
            'courier': 'USPS',
        },
    },
    'billyreid': {
        'api_key': 'billyreid_dev',
        'abbrev': 'BR',
        'url': 'http://localhost',
        'htk': {
            'courier': 'USPS',
        },
    }
}