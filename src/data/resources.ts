import type { Resource } from '@/types'

export const resources: Resource[] = [
  {
    id: 'goodfellow-deep-learning-2016',
    type: 'book',
    title: 'Deep Learning',
    authors: ['Ian Goodfellow', 'Yoshua Bengio', 'Aaron Courville'],
    year: 2016,
    venue: 'MIT Press',
    doi: '10.5555/3086952',
    discipline: 'computer-science',
    subdiscipline: 'machine-learning',
    tags: ['深度学习', 'deep learning', '神经网络', 'textbook'],
    abstract:
      '本书是 MIT Press 出版的深度学习领域权威教材,系统涵盖了机器学习与深度学习所需的数学基础、经典模型与前沿研究。内容分三大部分:第一部分介绍线性代数、概率论与数值计算等数学工具;第二部分讨论深度前馈网络、卷积网络、循环网络与正则化等基础模型;第三部分展开研究前沿,包括线性因子模型、自编码器、表示学习、结构化概率模型与蒙特卡洛方法。',
    preview:
      'MIT Press 出版的深度学习领域权威教材,系统覆盖数学基础、经典模型与前沿研究,适合作为机器学习研究者与工程师的标准参考。',
    downloadUrl: 'https://www.deeplearningbook.org/',
    externalUrl: 'https://www.deeplearningbook.org/',
    citation: {
      apa: 'Goodfellow, I., Bengio, Y., & Courville, A. (2016). Deep learning. MIT Press.',
      mla: 'Goodfellow, Ian, Yoshua Bengio, and Aaron Courville. Deep Learning. MIT Press, 2016.',
      gbt: 'Goodfellow I, Bengio Y, Courville A. Deep Learning[M]. Cambridge: MIT Press, 2016.',
      bibtex:
        '@book{goodfellow2016deep,\n  title={Deep Learning},\n  author={Goodfellow, Ian and Bengio, Yoshua and Courville, Aaron},\n  year={2016},\n  publisher={MIT Press}\n}',
    },
    addedAt: '2026-06-11',
    citations: 98000,
  },
  {
    id: 'attention-is-all-you-need',
    type: 'paper',
    title: 'Attention Is All You Need',
    authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit'],
    year: 2017,
    venue: 'NeurIPS',
    doi: '10.48550/arXiv.1706.03762',
    discipline: 'computer-science',
    subdiscipline: 'machine-learning',
    tags: ['Transformer', 'attention', 'NLP', '深度学习'],
    abstract:
      '本文提出了一种全新的网络架构 Transformer,完全基于注意力机制,摒弃了循环与卷积结构。在机器翻译任务上,Transformer 在 WMT 2014 英德翻译上取得 28.4 BLEU,英法翻译上取得 41.8 BLEU,均优于当时的最强模型,同时训练时间显著缩短。论文详细描述了多头自注意力、位置编码、残差连接与层归一化等关键设计,并奠定了此后 BERT、GPT 系列等预训练模型的基础。',
    preview:
      '提出完全基于注意力机制的网络架构 Transformer,取代 RNN/CNN,在机器翻译任务上显著优于既有最优模型,奠定预训练时代基础。',
    externalUrl: 'https://arxiv.org/abs/1706.03762',
    downloadUrl:
      'https://raw.githubusercontent.com/badhope/scholarHUB/main/assets/papers/attention-is-all-you-need.pdf',
    citation: {
      apa: 'Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L., & Polosukhin, I. (2017). Attention is all you need. Advances in Neural Information Processing Systems, 30.',
      mla: 'Vaswani, Ashish, et al. "Attention is all you need." Advances in Neural Information Processing Systems 30 (2017).',
      gbt: 'Vaswani A, Shazeer N, Parmar N, 等. Attention is all you need[C]//Advances in Neural Information Processing Systems. 2017: 5998-6008.',
      bibtex:
        '@inproceedings{vaswani2017attention,\n  title={Attention is all you need},\n  author={Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and Uszkoreit, Jakob and Jones, Llion and Gomez, Aidan N and Kaiser, {\\L}ukasz and Polosukhin, Illia},\n  booktitle={NeurIPS},\n  year={2017}\n}',
    },
    addedAt: '2026-06-11',
    citations: 92000,
  },
  {
    id: 'mnist-handwritten-digit-database',
    type: 'dataset',
    title: 'MNIST Handwritten Digit Database',
    authors: ['Yann LeCun', 'Corinna Cortes', 'Christopher J.C. Burges'],
    year: 1998,
    venue: 'AT&T Labs',
    discipline: 'computer-science',
    subdiscipline: 'machine-learning',
    tags: ['图像分类', 'benchmark', 'handwriting'],
    abstract:
      'MNIST 是手写数字图像的经典基准数据集,包含 60000 张训练样本与 10000 张测试样本,每张为 28×28 像素的灰度图,标注 0-9 的数字。该数据集被广泛用于图像分类、神经网络入门与算法基准测试,推动了卷积神经网络的发展。原始数据来自美国国家标准与技术研究院 (NIST) 的两份数据集,经尺寸归一化与居中处理后形成。',
    preview:
      '包含 6 万训练样本与 1 万测试样本的手写数字灰度图,广泛用于图像分类、神经网络入门与算法基准测试。',
    externalUrl: 'http://yann.lecun.com/exdb/mnist/',
    downloadUrl: 'http://yann.lecun.com/exdb/mnist/',
    citation: {
      apa: 'LeCun, Y., Cortes, C., & Burges, C. J. (1998). The MNIST database of handwritten digits.',
      mla: 'LeCun, Yann, Corinna Cortes, and Christopher J.C. Burges. "The MNIST database of handwritten digits." (1998).',
      gbt: 'LeCun Y, Cortes C, Burges CJC. The MNIST database of handwritten digits[DB/OL]. 1998.',
      bibtex:
        '@misc{lecun1998mnist,\n  title={The MNIST database of handwritten digits},\n  author={LeCun, Yann and Cortes, Corinna and Burges, Christopher J.C.},\n  year={1998}\n}',
    },
    addedAt: '2026-06-11',
    citations: 30000,
  },
  {
    id: 'einstein-annus-mirabilis-1905',
    type: 'paper',
    title: 'On the Electrodynamics of Moving Bodies',
    authors: ['Albert Einstein'],
    year: 1905,
    venue: 'Annalen der Physik',
    doi: '10.1002/andp.19053221004',
    discipline: 'physics',
    subdiscipline: 'relativity',
    tags: ['狭义相对论', 'special relativity', '经典论文'],
    abstract:
      '这是爱因斯坦于 1905 年发表的狭义相对论奠基性论文。文章以两条基本假设出发:相对性原理与光速不变原理,重新推导出洛伦兹变换、时间膨胀、长度收缩与质能关系等重要结果。论文彻底改变了牛顿以来对时空的认知,并与同年的光电效应、布朗运动与分子大小测定等论文一起,构成了物理学史上的"奇迹年"。',
    preview:
      '狭义相对论奠基性论文,从相对性原理与光速不变原理出发,推导出洛伦兹变换、质能关系等核心结果。',
    externalUrl: 'https://onlinelibrary.wiley.com/doi/10.1002/andp.19053221004',
    downloadUrl:
      'https://raw.githubusercontent.com/badhope/scholarHUB/main/assets/papers/einstein-1905.pdf',
    citation: {
      apa: 'Einstein, A. (1905). On the electrodynamics of moving bodies. Annalen der Physik, 17(6), 891-921.',
      mla: 'Einstein, Albert. "On the electrodynamics of moving bodies." Annalen der Physik 17.6 (1905): 891-921.',
      gbt: 'Einstein A. On the electrodynamics of moving bodies[J]. Annalen der Physik, 1905, 17(6): 891-921.',
      bibtex:
        '@article{einstein1905electrodynamics,\n  title={On the electrodynamics of moving bodies},\n  author={Einstein, Albert},\n  journal={Annalen der Physik},\n  volume={17},\n  number={6},\n  pages={891--921},\n  year={1905}\n}',
    },
    addedAt: '2026-06-11',
    citations: 4200,
  },
  {
    id: 'watson-crick-dna-1953',
    type: 'paper',
    title: 'Molecular Structure of Nucleic Acids: A Structure for Deoxyribose Nucleic Acid',
    authors: ['James D. Watson', 'Francis H.C. Crick'],
    year: 1953,
    venue: 'Nature',
    doi: '10.1038/171737a0',
    discipline: 'biology',
    subdiscipline: 'molecular-biology',
    tags: ['DNA', '双螺旋', '经典论文'],
    abstract:
      '本文提出了 DNA 的双螺旋结构模型,被视为分子生物学的开端之一。作者基于 X 射线衍射数据(尤其是 Rosalind Franklin 与 Maurice Wilkins 提供的 Photo 51),结合 Chargaff 规则,推导出两条反向平行多核苷酸链通过碱基互补配对形成的螺旋结构,并讨论了这种结构对遗传信息复制的意义。',
    preview:
      '提出 DNA 双螺旋结构模型,结合 X 射线衍射与碱基互补配对,解释遗传信息的复制机制,标志着分子生物学的开端。',
    externalUrl: 'https://www.nature.com/articles/171737a0',
    downloadUrl:
      'https://raw.githubusercontent.com/badhope/scholarHUB/main/assets/papers/watson-crick-1953.pdf',
    citation: {
      apa: 'Watson, J. D., & Crick, F. H. (1953). Molecular structure of nucleic acids: A structure for deoxyribose nucleic acid. Nature, 171(4356), 737-738.',
      mla: 'Watson, James D., and Francis H.C. Crick. "Molecular structure of nucleic acids: A structure for deoxyribose nucleic acid." Nature 171.4356 (1953): 737-738.',
      gbt: 'Watson JD, Crick FHC. Molecular structure of nucleic acids: A structure for deoxyribose nucleic acid[J]. Nature, 1953, 171(4356): 737-738.',
      bibtex:
        '@article{watson1953molecular,\n  title={Molecular structure of nucleic acids: A structure for deoxyribose nucleic acid},\n  author={Watson, James D and Crick, Francis HC},\n  journal={Nature},\n  volume={171},\n  number={4356},\n  pages={737--738},\n  year={1953}\n}',
    },
    addedAt: '2026-06-11',
    citations: 18000,
  },
  {
    id: 'rudin-principles-mathematical-analysis',
    type: 'book',
    title: 'Principles of Mathematical Analysis',
    authors: ['Walter Rudin'],
    year: 1976,
    venue: 'McGraw-Hill',
    discipline: 'mathematics',
    subdiscipline: 'analysis',
    tags: ['数学分析', '实分析', 'textbook'],
    abstract:
      '本书是现代数学分析课程的经典入门教材,被广泛誉为"Baby Rudin"。从实数系的构造与拓扑性质出发,逐步建立序列、极限、连续、微分、黎曼积分、函数列与一致收敛等基本概念,并以严格证明与高度精炼的风格著称。书中例题与练习虽少但极富代表性,长期被用作数学系本科分析课程的核心读物。',
    preview:
      '现代数学分析课程的经典入门教材,以严格证明与精炼风格著称,覆盖实数系、极限、连续、微分与积分等基础内容。',
    externalUrl: 'https://www.mheducation.com/highered/product/principles-mathematical-analysis-rudin/9780070542358.html',
    citation: {
      apa: 'Rudin, W. (1976). Principles of mathematical analysis (3rd ed.). McGraw-Hill.',
      mla: 'Rudin, Walter. Principles of Mathematical Analysis. 3rd ed., McGraw-Hill, 1976.',
      gbt: 'Rudin W. Principles of mathematical analysis[M]. 3rd ed. New York: McGraw-Hill, 1976.',
      bibtex:
        '@book{rudin1976principles,\n  title={Principles of mathematical analysis},\n  author={Rudin, Walter},\n  year={1976},\n  edition={3},\n  publisher={McGraw-Hill}\n}',
    },
    addedAt: '2026-06-11',
    citations: 22000,
  },
  {
    id: 'aumann-consistent-axioms-1962',
    type: 'paper',
    title: 'Utility Theory without the Completeness Axiom',
    authors: ['Robert J. Aumann'],
    year: 1962,
    venue: 'Econometrica',
    doi: '10.2307/1910091',
    discipline: 'economics',
    subdiscipline: 'decision-theory',
    tags: ['效用理论', '决策论', '理性选择'],
    abstract:
      '本文研究了消费者偏好不必具有完备性的情境下的效用表示问题。Aumann 证明,只要偏好满足连续性与单调性等条件,即便不存在效用函数表示,仍可借助"效用"的多值结构刻画偏好。该工作为不完全信息下的决策分析、模糊偏好与多目标选择奠定了公理化基础,也对后续行为经济学与机制设计研究产生了深远影响。',
    preview:
      '研究偏好不具备完备性时的效用表示问题,证明在连续性等条件下仍可借助多值结构刻画偏好,奠定不完全决策理论基础。',
    externalUrl: 'https://www.jstor.org/stable/1910091',
    citation: {
      apa: 'Aumann, R. J. (1962). Utility theory without the completeness axiom. Econometrica, 30(3), 445-462.',
      mla: 'Aumann, Robert J. "Utility theory without the completeness axiom." Econometrica 30.3 (1962): 445-462.',
      gbt: 'Aumann RJ. Utility theory without the completeness axiom[J]. Econometrica, 1962, 30(3): 445-462.',
      bibtex:
        '@article{aumann1962utility,\n  title={Utility theory without the completeness axiom},\n  author={Aumann, Robert J},\n  journal={Econometrica},\n  volume={30},\n  number={3},\n  pages={445--462},\n  year={1962}\n}',
    },
    addedAt: '2026-06-11',
    citations: 1100,
  },
  {
    id: 'numpy-tutorial-2023',
    type: 'tutorial',
    title: 'NumPy 入门与向量化编程',
    authors: ['ScholarHUB Editorial'],
    year: 2026,
    venue: 'ScholarHUB Tutorials',
    discipline: 'computer-science',
    subdiscipline: 'scientific-computing',
    tags: ['NumPy', 'Python', '向量化', '教程'],
    abstract:
      '本教程面向科学计算入门者,系统介绍 NumPy 的核心数据结构 ndarray、广播机制、索引切片、通用函数与线性代数模块,以及如何用向量化替代 Python 显式循环以获得百倍级性能提升。教程中包含可直接在浏览器或本地运行的示例代码,涉及图像统计、随机游走、矩阵分解等典型场景,帮助读者建立高效的数值计算直觉。',
    preview:
      '面向科学计算入门者,系统介绍 ndarray、广播、向量化与线性代数模块,示例可直接运行,帮助建立高效数值计算直觉。',
    externalUrl: 'https://numpy.org/doc/stable/user/absolute_beginners.html',
    citation: {
      apa: 'ScholarHUB Editorial. (2026). NumPy 入门与向量化编程. ScholarHUB Tutorials.',
      mla: 'ScholarHUB Editorial. "NumPy 入门与向量化编程." ScholarHUB Tutorials, 2026.',
      gbt: 'ScholarHUB Editorial. NumPy 入门与向量化编程[Z]. ScholarHUB Tutorials, 2026.',
      bibtex:
        '@misc{scholarhub2026numpy,\n  title={NumPy 入门与向量化编程},\n  author={{ScholarHUB Editorial}},\n  year={2026},\n  howpublished={ScholarHUB Tutorials}\n}',
    },
    addedAt: '2026-06-11',
  },
]

export const resourceMap: Record<string, Resource> = Object.fromEntries(
  resources.map((r) => [r.id, r])
)
