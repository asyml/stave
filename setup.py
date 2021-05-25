import sys
from pathlib import Path
import setuptools

long_description = (Path(__file__).parent / "README.md").read_text()

if sys.version_info < (3, 6):
    sys.exit('Python>=3.6 is required by Stave.')

setuptools.setup(
    name="stave",
    version="0.1.0post1",
    url="https://github.com/asyml/stave",

    description="Stave is a fast, lightweight, extensible web-based text "
                "annotation and visualization tool designed to support a "
                "wide range of data types and NLP tasks.",
    long_description=long_description,
    long_description_content_type='text/markdown',
    license='Apache License Version 2.0',
    package_dir={'': "simple-backend"},
    packages=setuptools.find_packages(where="simple-backend"),
    include_package_data=True,
    platforms='any',

    install_requires=[
        'django>=3.0.4',
        'tornado==6.1'
    ],
    extras_require={},
    entry_points={},
    classifiers=[
        'Intended Audience :: Developers',
        'Intended Audience :: Education',
        'Intended Audience :: Science/Research',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
    ]
)
