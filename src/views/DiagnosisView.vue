<script setup lang="ts">
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import { ref } from 'vue'

const analysisData = ref({
  riskScore: 66.07,
  comparison: [
    { method: '量表评分', accuracy: '85%', cost: '免费' },
    { method: 'PET-MRI', accuracy: '95%', cost: '18,000元' },
    { method: 'AI笔迹分析', accuracy: '92%', cost: '筛查免费' }
  ]
})

onMounted(() => {
  const chartDom = document.querySelector('.gauge-chart')
  if (chartDom) {
    const htmlChartDom = chartDom as HTMLElement;
    const resizeObserver = new ResizeObserver(() => {
      try {
        const chart = echarts.init(htmlChartDom)
        chart.setOption({
          series: [{
            type: 'gauge',
            center: ['50%', '60%'],
            radius: '75%',
            progress: { show: true, width: 12 },
            axisLine: { lineStyle: { width: 12, color: [[1, '#3498db']] } },
            axisTick: { show: false },
            splitLine: { length: 15, lineStyle: { color: 'auto' } },
            axisLabel: { color: '#666', distance: -15 },
            detail: {
              valueAnimation: true,
              fontSize: 24,
              color: '#2c3e50',
              offsetCenter: [0, '80%']
            },
            data: [{ value: 66.07, name: '风险指数' }]
          }]
        })
        htmlChartDom.style.visibility = 'visible'
      } catch (error) {
        console.error('图表初始化失败:', error)
        if (htmlChartDom) {
          htmlChartDom.innerHTML = '<div class="chart-error">图表加载失败，请刷新页面</div>'
        }
      }
    })
    resizeObserver.observe(chartDom)
  }
})
</script>

<template>
  <div class="diagnosis-container">
    <div class="main-content">
      <div class="left-column">
        <div class="gauge-chart" style="width:100%;height:300px"></div>
        
        <section class="hero-section">
          <h1>神经退行性疾病早期AI筛查系统</h1>
          <p class="highlight">书写特征分析，提前3-5年预警帕金森等疾病风险</p>
          <div class="stats-grid">
            <div class="stat-card">
              <h3>＞92%</h3>
              <p>分析准确率</p>
            </div>
            <div class="stat-card">
              <h3>无创</h3>
              <p>无辐射检测</p>
            </div>
          </div>
        </section>
      </div>

      <div class="right-column">
        <section class="upload-section">
          <h2>四步完成早期筛查</h2>
          <div class="process-flow">
            <div class="process-step" v-for="(step, index) in 4" :key="index">
              <div class="step-icon">{{ index + 1 }}</div>
              <p>{{ ['上传字迹样本', 'AI特征提取', '生成风险报告', '获取专业建议'][index] }}</p>
            </div>
          </div>
          <div class="upload-zone">
            <p>支持格式：JPEG/PNG/PDF（建议拍摄笔迹样本）</p>
          </div>
        </section>

        <section class="report-query-section">
          <h3>历史报告查询</h3>
          <p class="query-tip">选择日期查看历史分析报告：</p>
          <div class="date-picker-container">
            <input 
              type="date" 
              class="report-date-picker"
              :max="new Date().toISOString().split('T')[0]"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-query-section {
  background: white;
  padding: 1rem 2rem 2rem 4rem;
  border-radius: 1rem;
  margin-top: 2rem;
}

.report-query-section h3 {
  font-size: 1.5rem; 
  margin-bottom: 1rem;
}

.query-tip {
  color: #666;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.date-picker-container {
  margin-top: 1.5rem;
}

.report-date-picker {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
}

.report-date-picker:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52,152,219,0.2);
}

.diagnosis-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  display: flex;
  gap: 2rem;
  height: 100%;
  flex-grow: 1;
  width: 100%;
}

.left-column,
.right-column {
  flex: 1 1 50%;
  min-width: 480px;
  flex-grow: 1;
  overflow-y: auto;
}

.hero-section {
  text-align: center;
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 2rem;
  margin-bottom: 3rem;
}

.highlight {
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 1.5rem 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.upload-section {
  background: white;
  padding: 5rem 2rem 2rem 4rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

.upload-section h2 {
  font-size: 1.5rem; 
  margin-bottom: 1.5rem;
}

.feature-analysis {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-top: 2rem;
}

.feature-item {
  padding: 1rem;
  margin: 0.5rem 0;
  background: #f8f9fa;
  border-radius: 8px;
}

.process-flow {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
}

.process-step {
  text-align: center;
  flex: 1;
}

.step-icon {
  width: 50px;
  height: 50px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 0.5rem;
}

.upload-zone {
  border: 2px dashed #ccc;
  padding: 3rem;
  text-align: center;
  margin-top: 2rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
  white-space: nowrap;
}

.upload-zone:hover {
  border-color: #3498db;
  background: #e3f2fd;
}

@media (max-width: 768px) {
  .process-flow {
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style>