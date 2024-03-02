import json
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


url='https://www.booking.com/apartments/city/eg/sherm-el-sheikh.en-gb.html?aid=375802&label=eg-dkRKsZnjENtimQ3VQiDw8gS394242924906%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-379182631086%3Alp9112427%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YasQqy722txiHYUINjZjDPc&sid=e70e5d967c68c41c15d237fa7a68b82c'
 #open the driver and get the page
driver = webdriver.Firefox()
driver.get(url)
try:
    # Wait for some time for dynamic content to load
    wait = WebDriverWait(driver, 30)
except TimeoutException as e:
    print(f"TimeoutException: {e}")

page_source = driver.page_source
driver.quit() #close the driver
with open ('test_file.html', 'w') as file:
    file.write(page_source)